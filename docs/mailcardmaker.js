const HTML_SPACE = '&nbsp;';

const addressCardHTML = `
<li class="border p-2 addressCardForm">
<div class="row align-items-center addressCard">
    <div class="col-md-12 mb-2">
        <div class="row">
            <div class="col-md-7 d-flex flex-row">
                <div class="input-group h-100">
                    <span class="input-group-text h-100 fs-5">〒</span>
                    <input type="text" class="form-control h-100 postalCodeForm" placeholder="XXX-XXXX" autocomplete="postal-code">
                </div>
            </div>
            <div class="col-12 mb-2 d-md-none"></div>
            <div class="col-md-5 ps-md-0">
                <button type="button" class="btn btn-primary text-nowrap w-100 fs-6" disabled>
                    <i class="fas fa-search"></i>
                    住所検索
                </button>
            </div>
        </div>
    </div>
    <div class="col-md-12 mb-2">
        <textarea class="form-control w-100 addressForm" rows="3" placeholder="〇〇県△△市XX-X"></textarea>
    </div>
    <div class="col-md-12 mb-2">
        <div class="row">
            <div class="col-12">
                <div class="input-group h-100">
                    <span class="input-group-text h-100 fs-5">🏢</span>
                    <input type="text" class="form-control h-100 roomForm" placeholder="〇〇ビル1XX号室" autocomplete="postal-code">
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 mb-2">
        <div class="row">
            <div class="col-7 d-flex flex-row">
                <input type="text" class="form-control h-100 dearForm" placeholder="田中 太郎">
            </div>
            <div class="col-5 ps-0">
                <select class="form-select dearTypeSelect" aria-label="select">
                    <option value="1">御中</option>
                    <option value="2">様</option>
                    <option value="3">行</option>
                    <option value="4">無し</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="row">
            <div class="col-12">
                <div class="input-group h-100">
                    <input type="text" class="form-control h-100 enclosureForm" placeholder="〇〇書類" autocomplete="postal-code">
                    <span class="input-group-text h-100 fs-5">在中</span>
                </div>
            </div>
        </div>
    </div>
</div>
</li> 
`;

/**
 * 
 * @param {number} max 
 * @returns {number} 0 ~ max - 1の値
 */
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
  


/**
 * 
 * @param {HTMLElement} ctx 
 */
const removeAllChild = (ctx) => {
    while(ctx.firstChild) {
        ctx.removeChild(ctx.firstChild);
    }
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 */
const addAddressCard = (ctx) => {
    const parser = new DOMParser();
    const addressCardForm = parser.parseFromString(addressCardHTML, 'text/html');

    ctx.appendChild(addressCardForm.body.firstChild);
}


/**
 * 
 * @param {HTMLSelectElement} ctx 
 */
const getSelectedDearTypeValue = (ctx) => {
    const selectIndex = ctx.selectedIndex;

    if (selectIndex != 4) {
        return ctx.options[selectIndex].text;
    }
    else {
        return '';
    }
}


/**
 * 
 * @param {HTMLLIElement} addressCardForm 
 */
const validAndGetFormsValue = (addressCardForm) => {
    const postalCodeForm = addressCardForm.getElementsByClassName('postalCodeForm')[0];
    const addressForm = addressCardForm.getElementsByClassName('addressForm')[0];
    const roomForm = addressCardForm.getElementsByClassName('roomForm')[0];
    const dearForm = addressCardForm.getElementsByClassName('dearForm')[0];
    const dearTypeSelect = addressCardForm.getElementsByClassName('dearTypeSelect')[0];
    const enclosureForm = addressCardForm.getElementsByClassName('enclosureForm')[0];

    let postalCodeValue = postalCodeForm.value;
    
    if (!(postalCodeValue.length == 8 && postalCodeValue.match('-'))) {
        throw Error;
    }

    postalCodeValue = postalCodeValue.replace('-', '');

    const addressValue = addressForm.value;
    const roomValue = roomForm.value;
    const dearValue = dearForm.value;
    const dearTypeValue = getSelectedDearTypeValue(dearTypeSelect);
    const enclosureValue = enclosureForm.value; 

    return {
        postalCode: postalCodeValue,
        address: addressValue,
        room: roomValue,
        dear: dearValue,
        dearType: dearTypeValue,
        enclosure: enclosureValue
    };
}


const formatEnclosureHTML = (enclosure) => {
    if(enclosure) {
        return `
        <div class="col-12 d-flex justify-content-center text-center">
                <div class="border border-danger border-3 rounded" style="width: 85%;">
                    <span class="text-danger fs-3 fw-bold">${enclosure}在中</span>
                </div>
        </div>
        `
    }
    else {
        return '';
    }
}


/**
 * 
 * @param {object} formsValue 
 */
const formatAddressCardImageHTML = (formsValue) => {
    const addressCardImage = `
    <li class="border border-2 p-2 addressCardImage">
        <div class="row">
            <div class="col-12 d-flex justify-content-end">
                <span class="text-danger me-1 p-2 fs-3">〒</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[0]}</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[1]}</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[2]}</span>
                <span class="p-2 me-1 fs-3">-</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[3]}</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[4]}</span>
                <span class="border border-3 me-1 p-2 fs-3">${formsValue.postalCode[5]}</span>
                <span class="border border-3 p-2 fs-3">${formsValue.postalCode[6]}</span>
                <div class="me-3 me-sm-3 me-md-3 me-lg-5"></div>
            </div>
            <div class="col-12 d-flex justify-content-center text-center">
                <ul class="list-group list-group-flush mt-5 mb-3" style="width: 85%;">
                    <li class="list-group-item border-bottom p-0">
                        <span class="fs-3">${formsValue.address}</span>
                    </li>
                    <li class="list-group-item border-bottom p-0">
                        <span class="fs-3">${formsValue.room || HTML_SPACE}</span>
                    </li>
                    <li class="list-group-item border-bottom p-0">
                        <span class="fs-3">${formsValue.dear} ${formsValue.dearType}</span>
                    </li>
                </ul>
            </div>
            ${formatEnclosureHTML(formsValue.enclosure)}
        </div>
    </li>
    `;

    const parser = new DOMParser();
    const document = parser.parseFromString(addressCardImage, 'text/html');

    return document.body.firstChild;
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 * @param {HTMLCollectionOf<HTMLLIElement>} addressCardFormList
 */
const makeAddressLabel = (ctx, addressCardFormList) => {
    removeAllChild(ctx);

    for(let addressCardForm of addressCardFormList) {
        try {
            const formsValue = validAndGetFormsValue(addressCardForm);
            const addressCardImage = formatAddressCardImageHTML(formsValue);
            ctx.appendChild(addressCardImage);
        } catch (e){
            console.error(e);
            continue;
        }
    } 
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 */
const downloadAllMailLabel = (ctx) => {
    for(let element of ctx.childNodes){
        html2canvas(element)
                .then((canvas) => {
                    const id = new String(getRandomInt(10000)).padStart(4, '0')

                    const link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = `mailLabel_${id}.png`

                    link.click();
                })
    }
}