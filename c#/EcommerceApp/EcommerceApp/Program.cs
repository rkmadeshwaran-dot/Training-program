// See https://aka.ms/new-console-template for more information

using System;
using System.ComponentModel;

class Product
{
    public int Id;
    public string Name;
    public decimal Price;
    public int Quantity;

    public void Display()
    {
        Console.WriteLine("ID: {Id} | {Name} - ${Price} | In Stock: {Quantity}");
    }
}

class ShoppingCart
{
    private List<Product> items = new List<Product>();

    public void Add(Product product)
    {
        items.Add(product);
        Console.WriteLine($"{product.Name} added to cart.");
    }

    public void ShowCart()
    {
        if (items.Count == 0)
        {
            Console.WriteLine("Cart is empty.");
            return;
        }

        Console.WriteLine("Items in cart:");
        foreach (var item in items)
        {
            Console.WriteLine($"{item.Name} - ${item.Price}");
        }
    }

    public void Checkout()
    {
        if (items.Count == 0)
        {
            Console.WriteLine("Cart is empty.");
            return;
        }

        decimal total = 0;
        foreach (var item in items)
        {
            total += item.Price;
        }

        Console.WriteLine($"Total: ${total}");
        Console.WriteLine("Thanks for your purchase!");
        items.Clear();
    }
}

class Program
{
    static void Main(string[] args)
    {
        List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Phone", Price = 500, Quantity = 5 },
            new Product { Id = 2, Name = "Laptop", Price = 900, Quantity = 3 },
            new Product { Id = 3, Name = "Mouse", Price = 20, Quantity = 10 }
        };

        ShoppingCart cart = new ShoppingCart();
        bool running = true;

        while (running)
        {
            Console.WriteLine("\n1. View Products\n2. Add to Cart\n3. View Cart\n4. Checkout\n5. Exit");
            Console.Write("Choose: ");
            string choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    foreach (var p in products)
                        p.Display();
                    break;

                case "2":
                    Console.Write("Enter Product ID: ");
                    int id = int.Parse(Console.ReadLine());
                    var prod = products.FirstOrDefault(p => p.Id == id && p.Quantity > 0);
                    if (prod != null)
                    {
                        cart.Add(new Product { Id = prod.Id, Name = prod.Name, Price = prod.Price });
                        prod.Quantity--;
                    }
                    else
                    {
                        Console.WriteLine("Invalid or out of stock.");
                    }
                    break;

                case "3":
                    cart.ShowCart();
                    break;

                case "4":
                    cart.Checkout();
                    break;

                case "5":
                    running = false;
                    break;

                default:
                    Console.WriteLine("Invalid choice.");
                    break;
            }
        }

        Console.WriteLine("Goodbye!");
    }
}


