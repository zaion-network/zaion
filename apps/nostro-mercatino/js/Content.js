import { UIDesign } from "./Dom.js";
export class Content {
    constructor(value) {
        this.value = value;
    }
    get tree() {
        return Content.createContent(this.value.prodotti);
    }
    get element() {
        return Content.createContent(this.value.prodotti).element;
    }
}
(function (Content) {
    Content.createContent = (prodotti) => {
        const makeOption = (value, text) => {
            const option = new UIDesign({
                tag: "option",
                id: "select-option",
                className: "bg",
            })
                .setInnerText(text)
                .setHtmlAttribute("value", value);
            return option;
        };
        const all = makeOption("", "#All-tags");
        const vestiti = makeOption("vestiti", "#vestiti");
        const musica = makeOption("musica", "#musica");
        const elettronica = makeOption("elettronica", "#elettronica");
        const mobili = makeOption("mobili", "#mobili");
        const viaggiare = makeOption("viaggiare", "#viaggiare");
        const soundSys = makeOption("soundsystem", "#soundsystem");
        const select = new UIDesign({
            tag: "select",
            id: "tags-select",
            className: "bg mb_10 mt_10 ol_0 b_n p_4 brad_9 js_e",
        });
        const tagsDropdown = new UIDesign({
            tag: "div",
            id: "tags-dropdown",
            className: "grid z_1 pos_s top_0 r_0",
        });
        const prdScroll = new UIDesign({
            tag: "div",
            id: "product-scroll",
            className: "",
        });
        for (let k in prodotti) {
            prdScroll.addChild(prodotti[k].tree);
        }
        const productContainer = new UIDesign({
            tag: "div",
            id: "product-container",
            className: "bg grid p_10 pb_0 pos_f top_as_testata box_bb ofy_a mh_100% w_100% ch_1",
        })
            .addChild(tagsDropdown)
            .addChild(prdScroll);
        tagsDropdown.addChild(select);
        select
            .addChild(all)
            .addChild(vestiti)
            .addChild(musica)
            .addChild(elettronica)
            .addChild(mobili)
            .addChild(viaggiare)
            .addChild(soundSys);
        return productContainer;
    };
})(Content || (Content = {}));
