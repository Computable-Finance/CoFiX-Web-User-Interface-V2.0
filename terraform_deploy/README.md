# Terraform 部署配置脚本

[English](README.en.md)

使用 [terraform](https://www.terraform.io/) 部署到 S3。请先确保项目正常构建之后使用此脚本部署。

## 依赖

- [terraform-cli](https://www.terraform.io/downloads.html)
- [aws-cli](https://docs.aws.amazon.com/cli/index.html)

使用以下任意一种方式配置 AWS 认证凭证：

- 命令: `aws configure`
- 设置 `AWS_ACCESS_KEY_ID` 和 `AWS_SECRET_ACCESS_KEY` 环境变量

## 使用

```sh
# 仅第一次运行需要
terraform init

# 每次部署的时候执行
terraform apply

# 检测部署结果
terraform output
terraform show
```

## 配置

直接修改 `cofix_resources.tf` 中的 `variable` 代码块。或者通过环境变量以及命令行参数覆盖。

E.g:

```sh
terraform apply -var 'bucket=tmp'
# Or
TF_VAR_bucket=tmp terraform apply
```

## 待办

- [ ] 产品环境部署添加 CNAMEs, ACM, 以及 CloudFront create-invalidation 管理
- [ ] 使用 S3 作为 tfstate 存储后端
- [ ] CI 集成
- [ ] `terraform import` 导入当前已部署过的环境
