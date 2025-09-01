variable "project_name" {
  description = "The name of the project"
  type        = string
}

variable "aws_region" {
  description = "The AWS region to deploy to"
  type        = string
}

variable "environment" {
  description = "The environment to deploy to"
  type        = string
}

variable "root_domain" {
  description = "The root domain to use for the project"
  type        = string
}

variable "domain_name" {
  description = "The domain name to use for the project"
  type        = string
}
