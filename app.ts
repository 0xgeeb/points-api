import dotenv from "dotenv"
import express, { Request, Response } from "express"
import { gql, request } from "graphql-request"
import { createConfig, http } from "wagmi"
import { formatEther, parseEther, type Chain } from "viem"
import { getPublicClient, readContract } from "@wagmi/core"
import vaultABI from './abis/WeethGoldivault.json'
import quoterABI from "./abis/QuoterV2.json"

dotenv.config()
const app = express()
const port = 3000
app.use(express.json())

const BerachainMainnet = {
  id: 80094,
  name: "Berachain",
  nativeCurrency: {
    name: "BERA",
    symbol: "BERA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.berachain.com/"],
    },
    public: {
      http: ["https://rpc.berachain.com/"],
    }
  }
} as const satisfies Chain

export const config = createConfig({
  chains: [BerachainMainnet],
  ssr: true,
  transports: {
    [BerachainMainnet.id]: http()
  }
})

const RUSD_ADDRESS = '0x09D4214C03D01F49544C0448DBE3A27f768F2b34'
const RUSDOT_ADDRESS = '0x4A8B5283E053A8B118EaDc4981e8Ec8659995652'
const RUSDVAULT_ADDRESS = '0x8f65453BF050233d3BD6a08A5Eb53C1fD73312EC'
const QUOTER_ADDRESS = '0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B'

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

app.get("/dolomite", async (req: Request, res: Response) => {
  console.log('dolomite api request received')
  const endTimeResult: any = await readContract(config, {
    address: RUSDVAULT_ADDRESS as `0x${string}`,
    abi: vaultABI.abi,
    functionName: "endTime",
    args: []
  })
  let buyingOTQuoteResult: any = await readContract(config, {
    address: QUOTER_ADDRESS as `0x${string}`,
    abi: quoterABI.abi,
    functionName: "quoteExactOutputSingle",
    args: [[
      RUSD_ADDRESS,
      RUSDOT_ADDRESS,
      parseEther(`1`),
      500,
      0
    ]]
  })
  const endTime = parseFloat(endTimeResult)
  const buyingOTPrice = parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))
  const timeDifference = endTime * 1000 - Date.now()
  const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24)
  const daysTil = parseFloat(fixedDaysDifference.toFixed(2))
  const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil)
  const jsonResponse = {
    rusdOTFixedApr: fixedAprResponse
  }
  console.log(jsonResponse)
  res.json(jsonResponse)
})

app.listen(port, () => console.log(`Goldilocks Points API is running on http://localhost:${port}`))