using DoctorsSearchApp.Common.Entities;

namespace DoctorsSearchApp.Common.Interfaces
{
    public interface ILanguageRepository : IRepository<Language>
    {
        Task<Dictionary<string, string>> GetLanguageDictionaryAsync();
    }
}
