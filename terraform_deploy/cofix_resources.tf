variable "region" {
  default = "ap-southeast-1"
}

variable "bucket" {
  default = "cofix-interface-test"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "cofix" {
  bucket        = var.bucket
  force_destroy = true

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${var.bucket}/*"
            ]
        }
    ]
}
EOF

  website {
    index_document = "index.html"
  }
}

resource "aws_cloudfront_distribution" "cofix_cdn" {
  origin {
    origin_id   = var.bucket
    domain_name = aws_s3_bucket.cofix.website_endpoint

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  #aliases = [var.domain]

  enabled             = true
  default_root_object = "index.html"
  is_ipv6_enabled     = true
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.bucket

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Use aws cli for uploading:
# https://github.com/terraform-providers/terraform-provider-aws/issues/3020#issuecomment-423574705
resource "null_resource" "cofix_website_upload_to_s3" {
  triggers = {
    build_number = timestamp()
  }

  provisioner "local-exec" {
    command = <<-EOT
      aws s3 sync "${path.module}/../www/" "s3://${aws_s3_bucket.cofix.id}" --cache-control 'max-age=86400,public' && \
      aws cloudfront create-invalidation --distribution-id "${aws_cloudfront_distribution.cofix_cdn.id}" --paths '/*'
    EOT
  }
}

output "s3_website_endpoint" {
  value = aws_s3_bucket.cofix.website_endpoint
}

output "cdn_domain" {
  value = aws_cloudfront_distribution.cofix_cdn.domain_name
}
