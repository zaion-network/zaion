import { UIDesign } from "./Dom.js";
export class Product {
    constructor(prop) {
        this.value = prop;
    }
    get tree() {
        return Product.createProduct(this.value);
    }
    get element() {
        return Product.createProduct(this.value).element;
    }
}
(function (Product) {
    Product.createProduct = ({ dataTag, tags, title: t, description: d, alt, src, }) => {
        const product_ = new UIDesign({
            tag: "div",
            id: "product",
            className: "b_1-s-gd flex flex-column p_10 bg ai_c mb_10 brad_4 mw_product",
        });
        const filter = new UIDesign({
            tag: "div",
            className: "bg_fd pos_a h_100cqh w100cqw",
            id: "filter",
        });
        const image_ = new UIDesign({
            tag: "img",
            id: "product-image",
            className: "h_100cqh w100cqw of_c",
        }).setHtmlAttribute("src", src);
        image_.element.addEventListener("error", function () {
            this.setAttribute("src", "https://ipfs.io/ipfs/QmULxCPwp96RcdMmghqSZ2gb41Z2tkHAdMUcsuoZRk2pZD?filename=default_image.JPG");
            imageContainer.element.appendChild(filter.element);
        });
        const imageContainer = new UIDesign({
            tag: "div",
            className: "grid h_300 w_300 of_a ct_s cu_p",
            id: "img-container",
        });
        const description_container_ = new UIDesign({
            tag: "div",
            className: "flex flex-column p_10",
            id: "description-container",
        });
        const details_ = new UIDesign({
            tag: "div",
            id: "details",
            className: "flex flex-wrap fs_80%",
        }).setHtmlAttribute("data-tags", dataTag);
        tags
            .map((t, i) => {
            const tag = new UIDesign({
                tag: "p",
                id: "product-tag" + i,
                className: "brad_5 bg_lightGreen p_2 mt_0 mr_3 mb_3 ml_0 c_d w_maxcont",
            }).setInnerText(t);
            return tag;
        })
            .forEach((n) => {
            details_.addChild(n);
        });
        const title_ = new UIDesign({
            tag: "div",
            id: "product-title",
            className: "fw_b",
        });
        const h2 = new UIDesign({
            tag: "h2",
            id: "product-h2",
            className: "mt_0 mr_3 mb_10 ml_0 cu_p",
        }).setInnerText(t);
        const description_ = new UIDesign({
            tag: "div",
            id: "product-description",
            className: "c_l",
        }).setInnerText(d);
        const tree = product_
            .addChild(imageContainer)
            .addChild(description_container_);
        imageContainer.addChild(image_);
        description_container_
            .addChild(details_)
            .addChild(title_)
            .addChild(description_);
        title_.addChild(h2);
        return tree;
    };
})(Product || (Product = {}));
