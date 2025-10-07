using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            
            _pizzaManager.AddUser();
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();

        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {

            string groupe = _pizzaManager.GetGroupName(choice);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupe);
            await Clients.Group(groupe).SendAsync("UpdateMoney", _pizzaManager.Money[(int)choice]);
            await Clients.Group(groupe).SendAsync("UpdatePizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);



        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupe = _pizzaManager.GetGroupName(choice);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupe);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            string groupe = _pizzaManager.GetGroupName(choice);

            _pizzaManager.IncreaseMoney(choice);
            await Clients.Group(groupe).SendAsync("UpdateMoney", _pizzaManager.Money[(int)choice]);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            string groupe = _pizzaManager.GetGroupName(choice);
            _pizzaManager.BuyPizza(choice);
            await Clients.Group(groupe).SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.Money[(int)choice], _pizzaManager.NbPizzas[(int)choice]);
        }
    }
}
