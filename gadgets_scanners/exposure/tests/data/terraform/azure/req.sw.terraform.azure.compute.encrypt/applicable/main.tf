terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.99.0"
    }
  }
}

provider "azurerm" {
   features {}
}

resource "azurerm_resource_group" "example" {
  name     = "example-resourcesbeta104"
  location = "West Europe"
}

resource "azurerm_managed_disk" "example" {
  name                 = "acctestmd"
  location             = azurerm_resource_group.example.location
  resource_group_name  = azurerm_resource_group.example.name
  storage_account_type = "Standard_LRS"
  create_option        = "Empty"
  disk_size_gb         = "1"

  tags = {
    environment = "staging"
  }
}