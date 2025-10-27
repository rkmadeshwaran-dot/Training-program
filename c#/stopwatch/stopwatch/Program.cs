// See https://aka.ms/new-console-template for more information
using System;
using System.Timers;

public class Clock
{
    public event EventHandler? OnTick;
    private System.Timers.Timer timer; 

    public Clock()
    {
        timer = new System.Timers.Timer(1000); // Fully qualify Timer
        timer.Elapsed += TimerElapsed;
    }

    private void TimerElapsed(object? sender, ElapsedEventArgs e)
    {
        OnTick?.Invoke(this, EventArgs.Empty);
    }

    public void Start()
    {
        timer.Start();
    }

    public void Stop()
    {
        timer.Stop();
    }
}

public class Display
{
    public void Subscribe(Clock clock)
    {
        clock.OnTick += (sender, e) =>
        {
            Console.WriteLine("Current Time: " + DateTime.Now.ToLongTimeString());
        };
    }
}

class Program
{
    static void Main()
    {
        Clock clock = new Clock();
        Display display = new Display();

        display.Subscribe(clock);

        Console.WriteLine("Clock started. Press Enter to stop...\n");
        clock.Start();

        Console.ReadLine();
        clock.Stop();
        Console.WriteLine("Clock stopped.");
    }
}
