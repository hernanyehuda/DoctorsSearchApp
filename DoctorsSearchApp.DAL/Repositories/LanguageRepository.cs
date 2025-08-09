using DoctorsSearchApp.Common.Entities;
using DoctorsSearchApp.Common.Interfaces;
using Newtonsoft.Json;

namespace DoctorsSearchApp.DAL.Repositories
{
    public class LanguageRepository : BaseRepository<Language>, ILanguageRepository
    {
        public LanguageRepository() : base("language.json")
        {
        }

        public override async Task<IEnumerable<Language>> GetAllAsync()
        {
            if (!File.Exists(_filePath))
                return Enumerable.Empty<Language>();

            var json = await File.ReadAllTextAsync(_filePath);
            var languageData = JsonConvert.DeserializeObject<LanguageData>(json);

            if (languageData?.LanguageDictionary == null)
                return Enumerable.Empty<Language>();

            return languageData.LanguageDictionary.Select(kvp => new Language
            {
                Id = kvp.Key,
                Name = kvp.Value
            });
        }

        public async Task<Dictionary<string, string>> GetLanguageDictionaryAsync()
        {
            var languages = await GetAllAsync();
            return languages.ToDictionary(l => l.Id, l => l.Name);
        }

        private class LanguageData
        {
            [JsonProperty("language")]
            public Dictionary<string, string> LanguageDictionary { get; set; } = new Dictionary<string, string>();
        }
    }
}