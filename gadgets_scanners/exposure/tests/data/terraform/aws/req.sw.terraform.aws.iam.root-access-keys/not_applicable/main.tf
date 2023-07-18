terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile    = "default"
  region     = "us-west-2"
  access_key = "my-access-key"
  secret_key = "my-secret-key"

}

resource "aws_iam_access_key" "lb" {
  user      = aws_iam_user.lb.name
  status    = "Active"
}

resource "aws_iam_user" "lb" {
  name = "user"
  path = "/system/"
}
