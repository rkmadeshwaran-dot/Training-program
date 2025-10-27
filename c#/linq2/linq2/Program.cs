// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;
using System.Linq;

class Product
{
    public required string Name { get; set; }
    public required string Category { get; set;}
    public decimal Price { get; set; }
}

class AdvancedLINQExample
{
    static void Main(string[] args)
    {
        List<Product> products = new List<Product>
        {
            new Product { Name = "Pen", Category = "Stationery", Price = 1.5m },
            new Product { Name = "Notebook", Category = "Stationery", Price = 3.0m },
            new Product { Name = "Apple", Category = "Food", Price = 0.75m },
            new Product { Name = "Sandwich", Category = "Food", Price = 2.5m },
            new Product { Name = "Marker", Category = "Stationery", Price = 2.0m },
            new Product { Name = "Juice", Category = "Food", Price = 1.8m }
        };

        // Group by category and count, then order by count descending
        var groupByCategory = from p in products
                              group p by p.Category into g
                              orderby g.Count() descending
                              select new
                              {
                                  Category = g.Key,
                                  Count = g.Count()
                              };

        Console.WriteLine("Product count by category (descending):");
        foreach (var group in groupByCategory)
        {
            Console.WriteLine($"{group.Category}: {group.Count}");
        }
    }
}
