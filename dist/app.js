"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const graphql_request_1 = require("graphql-request");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const RSETH_ISLANDHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    rsethIslandHolders {
      address
      islandAmt
    }
  }
`;
const RSETH_YTHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    rsethYTHolders {
      address
      ytAmt
    }
  }
`;
const RSETH_ISLANDBALANCES_QUERY = (0, graphql_request_1.gql) `
  query {
    rsethIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`;
const UNIBTC_ISLANDHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    unibtcIslandHolders {
      address
      islandAmt
    }
  }
`;
const UNIBTC_YTHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    unibtcYTHolders {
      address
      ytAmt
    }
  }
`;
const UNIBTC_ISLANDBALANCES_QUERY = (0, graphql_request_1.gql) `
  query {
    unibtcIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`;
const SOLVBTC_ISLANDHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    solvbtcIslandHolders {
      address
      islandAmt
    }
  }
`;
const SOLVBTC_YTHOLDERS_QUERY = (0, graphql_request_1.gql) `
  query {
    solvbtcYTHolders {
      address
      ytAmt
    }
  }
`;
const SOLVBTC_ISLANDBALANCES_QUERY = (0, graphql_request_1.gql) `
  query {
    solvbtcIslandBalances(id: "1") {
      balance0
      balance1
    }
  }
`;
const goldskyUrl = (_a = process.env.GOLDSKY_URL) !== null && _a !== void 0 ? _a : '';
app.get("/rseth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('rseth api request received');
    const islandHoldersResponse = yield (0, graphql_request_1.request)(goldskyUrl, RSETH_ISLANDHOLDERS_QUERY);
    const ytResponse = yield (0, graphql_request_1.request)(goldskyUrl, RSETH_YTHOLDERS_QUERY);
    const islandBalancesResponse = yield (0, graphql_request_1.request)(goldskyUrl, RSETH_ISLANDBALANCES_QUERY);
    const jsonResponse = {
        islandHolders: islandHoldersResponse === null || islandHoldersResponse === void 0 ? void 0 : islandHoldersResponse.rsethIslandHolders,
        ytHolders: ytResponse === null || ytResponse === void 0 ? void 0 : ytResponse.rsethYTHolders,
        islandBalances: islandBalancesResponse === null || islandBalancesResponse === void 0 ? void 0 : islandBalancesResponse.rsethIslandBalances
    };
    console.log(jsonResponse);
    res.json(jsonResponse);
}));
app.get("/unibtc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('unibtc api request received');
    const islandHoldersResponse = yield (0, graphql_request_1.request)(goldskyUrl, UNIBTC_ISLANDHOLDERS_QUERY);
    const ytResponse = yield (0, graphql_request_1.request)(goldskyUrl, UNIBTC_YTHOLDERS_QUERY);
    const islandBalancesResponse = yield (0, graphql_request_1.request)(goldskyUrl, UNIBTC_ISLANDBALANCES_QUERY);
    const jsonResponse = {
        islandHolders: islandHoldersResponse === null || islandHoldersResponse === void 0 ? void 0 : islandHoldersResponse.unibtcIslandHolders,
        ytHolders: ytResponse === null || ytResponse === void 0 ? void 0 : ytResponse.unibtcYTHolders,
        islandBalances: islandBalancesResponse === null || islandBalancesResponse === void 0 ? void 0 : islandBalancesResponse.unibtcIslandBalances
    };
    console.log(jsonResponse);
    res.json(jsonResponse);
}));
app.get("/solvbtc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('solvbtc api request received');
    const islandHoldersResponse = yield (0, graphql_request_1.request)(goldskyUrl, SOLVBTC_ISLANDHOLDERS_QUERY);
    const ytResponse = yield (0, graphql_request_1.request)(goldskyUrl, SOLVBTC_YTHOLDERS_QUERY);
    const islandBalancesResponse = yield (0, graphql_request_1.request)(goldskyUrl, SOLVBTC_ISLANDBALANCES_QUERY);
    const jsonResponse = {
        islandHolders: islandHoldersResponse === null || islandHoldersResponse === void 0 ? void 0 : islandHoldersResponse.solvbtcIslandHolders,
        ytHolders: ytResponse === null || ytResponse === void 0 ? void 0 : ytResponse.solvbtcYTHolders,
        islandBalances: islandBalancesResponse === null || islandBalancesResponse === void 0 ? void 0 : islandBalancesResponse.solvbtcIslandBalances
    };
    console.log(jsonResponse);
    res.json(jsonResponse);
}));
app.listen(port, () => console.log(`Goldilocks Points API is running on http://localhost:${port}`));
