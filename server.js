import express from "express"
import axios from "axios"
import cheerio from "cheerio"

const app = express()
const PORT = 3000

app.use(express.static("public"))

app.get("/fetch-roblox", async (req, res) => {
    try {
        const response = await axios.get("https://www.roblox.com", {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        })

        const $ = cheerio.load(response.data)

        const title = $("title").text()
        const bodyContent = $("body").html()

        res.send(`
            <html>
                <head>
                    <title>Recreated Roblox</title>
                    <style>
                        body { font-family: Arial; padding: 20px; }
                        iframe { width: 100%; height: 800px; border: none; }
                    </style>
                </head>
                <body>
                    <h1>Recreated Page</h1>
                    <h2>Original Title: ${title}</h2>
                    <iframe srcdoc='${bodyContent.replace(/'/g, "&apos;")}'></iframe>
                </body>
            </html>
        `)
    } catch (error) {
        res.status(500).send("Error fetching Roblox")
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
