locals {
  tags = {
    project     = var.project_name
    environment = var.environment
    provider    = "terraform"
    responsible = "mittelette.nathan@gmail.com"
  }

  resources_name = "${lower(var.project_name)}-${var.environment}"
}
