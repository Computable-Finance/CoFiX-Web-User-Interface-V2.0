# Terraform deploy config

[简体中文](README.md)

Use [terraform](https://www.terraform.io/) to deploy to s3. Should be used after building the root project.

## Prerequisites

- [terraform-cli](https://www.terraform.io/downloads.html)
- [aws-cli](https://docs.aws.amazon.com/cli/index.html)

Configure AWS credentials by one of:

- Command: `aws configure`
- Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables.

## Usage

```sh
# Required for the first time run only
terraform init

# Every deployment
terraform apply

# Check deploy result
terraform output
terraform show

# Import existing infrastructure
terraform import aws_cloudfront_distribution.cofix_cdn <cloudfront_distribution_id>
terraform import aws_s3_bucket.cofix <bucket_name>
```

## Configuration

Modify `cofix_resources.tf` `variable` blocks. Or override through environmental variables or command line arguments.

E.g:

```sh
terraform apply -var 'bucket=tmp'
# Or
TF_VAR_bucket=tmp terraform apply
```

## TODO

- [ ] Production environment deploy with CNAMEs and ACM
- [ ] Use S3 as Backend
- [ ] Intergration with CI
