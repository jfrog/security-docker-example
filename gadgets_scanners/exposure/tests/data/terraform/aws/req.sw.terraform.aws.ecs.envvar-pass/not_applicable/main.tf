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

resource "aws_ecs_task_definition" "bad_example" {
   family = "service"
   container_definitions = <<EOF
 [
   {
     "name": "my_service",
     "essential": true,
     "memory": 256,
     "environment": [
       { "name": "ENVIRONMENT", "value": "development" }
     ]
   }
 ]
 EOF
}