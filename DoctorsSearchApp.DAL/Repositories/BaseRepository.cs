using DoctorsSearchApp.Common.Interfaces;
using Newtonsoft.Json;

namespace DoctorsSearchApp.DAL.Repositories
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        protected readonly string _filePath;

        protected BaseRepository(string fileName)
        {
            _filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", fileName);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            if (!File.Exists(_filePath))
                return Enumerable.Empty<T>();

            var json = await File.ReadAllTextAsync(_filePath);
            return JsonConvert.DeserializeObject<IEnumerable<T>>(json) ?? Enumerable.Empty<T>();
        }

        public virtual async Task<T?> GetByIdAsync(int id)
        {
            var items = await GetAllAsync();
            var itemType = typeof(T);
            var idProperty = itemType.GetProperty("Id");

            if (idProperty == null)
                return null;

            return items.FirstOrDefault(item =>
            {
                var itemId = idProperty.GetValue(item);
                return itemId != null && itemId.Equals(id);
            });
        }
    }
}