const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

const getItems = async (renderItems, renderButtons, filterBtn) => {
    try {
        const result = await fetch("api.json");
        const items = await result.json();
        renderItems(items);
        renderButtons(items);
        filterBtn(items, renderItems);
    } catch (error) {
        console.log(error);
    }
};

const renderMenuItems = (items) => {
    const itemsHtml = items
        .map((item) => {
            return `
				<article class="menu-item">
					<img src="${item.img}" alt="menu item" class="photo" />
					<div class="item-info">
						<header>
							<h4>${item.title}</h4>
							<h4 class="price">$${item.price}</h4>
						</header>
						<p class="item-text">
							${item.desc}
						</p>
					</div>
				</article>
			`;
        })
        .join("");
    sectionCenter.innerHTML = itemsHtml;
};

const renderMenuButtons = (items) => {
    const itemCategories = items.reduce(
        (navigation, link) => {
            if (!navigation.includes(link.category)) {
                navigation.push(link.category);
            }
            return navigation;
        },
        ["all"]
    );
    const navigationLinks = itemCategories
        .map((link) => {
            return `
				<button type="button" class="filter-btn" data-id="${link}">${link}</button>
			`;
        })
        .join("");
    btnContainer.innerHTML = navigationLinks;
};

const filterItems = (items, fn) => {
    const filterBtn = [...document.querySelectorAll(".filter-btn")];
    filterBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const btnData = btn.dataset.id;
            const filteredItems = items.filter((item) => {
                if (item.category === btnData) {
                    return item;
                }
            });
            console.log(filteredItems);
            if (btnData === "all") {
                fn(items);
            } else {
                fn(filteredItems);
            }
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getItems(renderMenuItems, renderMenuButtons, filterItems);
});
