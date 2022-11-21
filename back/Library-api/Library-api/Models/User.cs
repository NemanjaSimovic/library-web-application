namespace Library_api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username{ get; set; }
        public string? Password{ get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public int RoleId { get; set; }

        public User() { }
        public User(string username, string password, string name, string surname, int roleId)
        {
            Username = username;
            Password = password;
            Name = name;
            Surname = surname;
            RoleId = roleId;
        }
    }
}
