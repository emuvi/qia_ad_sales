import {
  AdExpect,
  AdModule,
  AdModules,
  AdRegBased,
  AdRegister,
  AdRegistry,
  AdScope,
  AdTools,
} from "admister";
import { Qine } from "qin_case";

const base = Qine.qinpel.window.loadConfig(Qine.qinpel.ours.consts.QIN_BASE_SELECTED);

export const tableHead = AdModules.PRODUCTS.tableHead;

export const registry: AdRegistry = { base, tableHead };

export const regBased: AdRegBased = {
    registry,
    joins: [
        {
            module: AdModules.PRODUCTS_GROUP,
            alias: "products_group",
            filters: [{ linked: { name: "grupo", with: "codigo" } }],
        },
        {
            module: AdModules.PRODUCTS_SUBGROUP,
            alias: "products_subgroup",
            filters: [
                { linked: { name: "grupo", with: "grupo" } },
                { linked: { name: "subgrupo", with: "codigo" } },
            ],
        },
    ],
};

export class AdProducts extends AdRegister {
    public constructor(module: AdModule, expect: AdExpect) {
        super(module, expect, regBased);
        this.addField(AdTools.newAdFieldString("codigo", "Código", 6).putKey());
        this.addField(AdTools.newAdFieldAtivo());
        this.addField(AdTools.newAdFieldString("nome", "Nome", 60));
        this.addField(AdTools.newAdFieldString("grupo", "Grupo - Cód.", 4).putKey());
        this.addField(AdTools.newAdFieldString("products_group.nome", "Grupo - Nome", 60));
        this.addField(AdTools.newAdFieldString("subgrupo", "SubGrupo - Cód.", 4).putKey());
        this.addField(AdTools.newAdFieldString("products_subgroup.nome", "SubGrupo - Nome", 60));
        this.addField(AdTools.newAdFieldNumeric("ordem", "Ordem"));
        this.addDetail({
            setup: {
                module: AdModules.PRICES,
                scopes: [AdScope.ALL],
                filters: [{ linked: { name: "produto", with: "codigo" } }],
            },
        });
        this.prepare();
    }
}
