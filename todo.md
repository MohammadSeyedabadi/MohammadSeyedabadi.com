{
url: `${baseUrl}/${id}/me`,
lastModified: new Date(),
alternates: {
languages: {
en: `${baseUrl}/en/me`,
fa: `${baseUrl}/fa/درباره-من`,
},
},
},

for this, you have to remove id and instead hardcode the value, then but the whole objects into array and then choose the array that match the id
so then you have both من and me for different locales
