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
  profile = "default"
  region  = "us-west-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleAppServerInstance"
  }
}

resource "aws_kinesis_stream" "bad_example" {
	name            = "test_stream"
	shard_count     = 1
	encryption_type = "KMS"
    kms_key_id 	    = "1a606be8-6873-4fac-817e-226f3a77d8ef"
}

