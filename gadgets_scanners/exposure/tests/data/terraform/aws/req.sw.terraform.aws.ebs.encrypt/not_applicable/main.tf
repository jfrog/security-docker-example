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

resource "aws_ebs_volume" "example" {
  availability_zone = "us-west-2a"
  size              = 40
  encrypted         = "true"

  tags = {
    Name = "HelloWorld"
  }
}
