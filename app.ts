import dotenv from "dotenv"
import express, { Request, Response } from "express"
import { gql, request } from "graphql-request"

dotenv.config()
const app = express()
const port = 3000
app.use(express.json())

const RSETH_ISLANDHOLDERS_QUERY = gql`
  query {
    rsethIslandHolders {
      address
      islandAmt
    }
  }
`
const RSETH_YTHOLDERS_QUERY = gql`
  query {
    rsethYTHolders {
      address
      ytAmt
    }
  }
`

const RSETH_ISLANDBALANCES_QUERY = gql`
  query {
    rsethIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`

const UNIBTC_ISLANDHOLDERS_QUERY = gql`
  query {
    unibtcIslandHolders {
      address
      islandAmt
    }
  }
`
const UNIBTC_YTHOLDERS_QUERY = gql`
  query {
    unibtcYTHolders {
      address
      ytAmt
    }
  }
`

const UNIBTC_ISLANDBALANCES_QUERY = gql`
  query {
    unibtcIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`

const SOLVBTC_ISLANDHOLDERS_QUERY = gql`
  query {
    solvbtcIslandHolders {
      address
      islandAmt
    }
  }
`
const SOLVBTC_YTHOLDERS_QUERY = gql`
  query {
    solvbtcYTHolders {
      address
      ytAmt
    }
  }
`

const SOLVBTC_ISLANDBALANCES_QUERY = gql`
  query {
    solvbtcIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`

const goldskyUrl = process.env.GOLDSKY_URL ?? ''

app.get("/rseth", async (req: Request, res: Response) => {
  console.log('rseth api request received')
  const islandHoldersResponse: any = await request(goldskyUrl, RSETH_ISLANDHOLDERS_QUERY)
  const ytResponse: any = await request(goldskyUrl, RSETH_YTHOLDERS_QUERY)
  const islandBalancesResponse: any = await request(goldskyUrl, RSETH_ISLANDBALANCES_QUERY)
  const jsonResponse = {
    islandHolders: islandHoldersResponse?.rsethIslandHolders,
    ytHolders: ytResponse?.rsethYTHolders,
    islandBalances: islandBalancesResponse?.rsethIslandBalances
  }
  console.log(jsonResponse)
  res.json(jsonResponse)
})

app.get("/unibtc", async (req: Request, res: Response) => {
  console.log('unibtc api request received')
  const islandHoldersResponse: any = await request(goldskyUrl, UNIBTC_ISLANDHOLDERS_QUERY)
  const ytResponse: any = await request(goldskyUrl, UNIBTC_YTHOLDERS_QUERY)
  const islandBalancesResponse: any = await request(goldskyUrl, UNIBTC_ISLANDBALANCES_QUERY)
  const jsonResponse = {
    islandHolders: islandHoldersResponse?.unibtcIslandHolders,
    ytHolders: ytResponse?.unibtcYTHolders,
    islandBalances: islandBalancesResponse?.unibtcIslandBalances
  }
  console.log(jsonResponse)
  res.json(jsonResponse)
})

app.get("/solvbtc", async (req: Request, res: Response) => {
  console.log('solvbtc api request received')
  const islandHoldersResponse: any = await request(goldskyUrl, SOLVBTC_ISLANDHOLDERS_QUERY)
  const ytResponse: any = await request(goldskyUrl, SOLVBTC_YTHOLDERS_QUERY)
  const islandBalancesResponse: any = await request(goldskyUrl, SOLVBTC_ISLANDBALANCES_QUERY)
  const jsonResponse = {
    islandHolders: islandHoldersResponse?.solvbtcIslandHolders,
    ytHolders: ytResponse?.solvbtcYTHolders,
    islandBalances: islandBalancesResponse?.solvbtcIslandBalances
  }
  console.log(jsonResponse)
  res.json(jsonResponse)
})

app.listen(port, () => console.log(`Goldilocks Points API is running on http://localhost:${port}`))