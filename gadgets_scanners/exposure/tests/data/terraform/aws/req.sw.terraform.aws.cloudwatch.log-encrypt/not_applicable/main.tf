terraform {


  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}


provider "aws" {
  profile = "default"
  region  = "us-west-2"
  access_key = "my-access-key"
  secret_key = "my-secret-key"

}

resource "aws_kms_key" "a" {
  description             = "KMS key 1"
  deletion_window_in_days = 10
}

resource "aws_cloudwatch_log_group" "yada" {
  name = "Yada"
  kms_key_id        = aws_kms_key.a.arn

  tags = {
    Environment = "production"
    Application = "serviceA"
  }
}
