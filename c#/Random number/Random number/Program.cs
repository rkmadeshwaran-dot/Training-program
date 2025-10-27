// See https://aka.ms/new-console-template for more information

using System;

class Program
{
      static void Main(string[] args)
    {
        Random random = new Random();
        int target = random.Next(1, 1001);
        int guess = 0;

        Console.WriteLine("Guess NUmber\n");
        Console.WriteLine("Hint: Guess  the number between 1-1001 \n");

        while(guess != target)
        {
            Console.WriteLine("Enter a number");
            string? input = Console.ReadLine();

            if (!int.TryParse(input,out guess))
            {
                Console.WriteLine("your number is not in the range of 1 to 1001 \n");
                continue;
            }
            if(guess< target)
            {
                Console.WriteLine("Your guess low");
            }
            else if(guess > target)
            {
                Console.WriteLine("your guess high");
            }
        }
        Console.WriteLine("Awesome! you guess was correct");

    } 
}