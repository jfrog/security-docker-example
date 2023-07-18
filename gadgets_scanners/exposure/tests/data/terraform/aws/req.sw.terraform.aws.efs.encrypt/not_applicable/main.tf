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

resource "aws_efs_file_system" "foo" {
  creation_token = "my-product"
  encrypted      = true

  tags = {
    Name = "MyProduct"
  }
}