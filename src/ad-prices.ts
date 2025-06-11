import {
  AdExpect,
  AdModule,
  AdModules,
  AdRegBased,
  AdRegister,
  AdRegistry,
  AdTools,
} from "admister";
import { Qine } from "qin_case";

const base = Qine.qinpel.window.loadConfig(Qine.qinpel.ours.consts.QIN_BASE_SELECTED);

export const tableHead = AdModules.PRICES.tableHead;

export const registry: AdRegistry = { base, tableHead };

export const regBased: AdRegBased = {
    registry,
    joins: [
        {
            module: AdModules.PRODUCTS,
            alias: "products",
            filters: [{ linked: { name: "produto", with: "codigo" } }],
        },
    ],
};

export class AdPrices extends AdRegister {
    public constructor(module: AdModule, expect: AdExpect) {
        super(module, expect, regBased);
        this.addField(AdTools.newAdFieldString("produto", "Produto - Cód.", 6).putKey());
        this.addField(AdTools.newAdFieldString("products.nome", "Produto - Nome.", 60));
        this.addField(AdTools.newAdFieldString("tabela", "Tabela", 6).putKey());
        this.addField(AdTools.newAdFieldNumeric("valor", "Valor"));
        this.prepare();
    }
}
