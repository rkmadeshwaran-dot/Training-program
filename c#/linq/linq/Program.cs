// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;
using System.Linq;

class Product
{
    public required string Name { get; set; }
    public required string Category { get; set; }
    public decimal Price { get; set; }
}

class LINQQueryExample
{
    static void Main()
    {
        List<Product> products = new List<Product>
        {
            new Product { Name = "Pen", Category = "Stationery", Price = 1.5m },
            new Product { Name = "Notebook", Category = "Stationery", Price = 3.0m },
            new Product { Name = "Apple", Category = "Food", Price = 0.75m },
            new Product { Name = "Sandwich", Category = "Food", Price = 2.5m },
        };

       
        string categoryToSearch = "Stationery";
        var selectedProducts = products.Where(p => p.Category == categoryToSearch).ToList();

        decimal averagePrice = selectedProducts.Any() ? selectedProducts.Average(p => p.Price) : 0;


        Console.WriteLine($"Products in category '{categoryToSearch}':");
        foreach (var p in selectedProducts)
        {
            Console.WriteLine($"{p.Name} - ${p.Price}");
        }

        Console.WriteLine($"\nAverage price: ${averagePrice:F2}");
    }
}

