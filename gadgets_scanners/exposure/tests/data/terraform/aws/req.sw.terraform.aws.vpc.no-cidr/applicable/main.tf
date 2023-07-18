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


resource "aws_vpc" "main" {
  cidr_block       = "0.0.0.0/0"
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}