const HTML_SPACE = '&nbsp;';

const addressLabelHTML = `
<li class="border p-2 addressLabelForm" onclick="selectAddressLabelForm(this)">
    <div class="row align-items-center addressLabel">
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
                        <input type="text" class="form-control h-100 roomForm" placeholder="〇〇ビル1XX号室">
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
        <div class="col-md-12 mb-2">
            <div class="row">
                <div class="col-12">
                    <div class="input-group h-100">
                        <input type="text" class="form-control h-100 enclosureForm" placeholder="〇〇書類">
                        <span class="input-group-text h-100 fs-5">在中</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input expressForm" type="checkbox" role="switch"/>
                        <label class="form-check-label" for="flexSwitchCheckDefault">速達</label>
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


let selectedAddressLabelFormElement = null;


/**
 * 
 * @param {Element} ctx 
 */
const selectAddressLabelForm = (ctx) => {
    if(selectedAddressLabelFormElement) {
        selectedAddressLabelFormElement.classList.remove('shadow');
    }

    ctx.classList.add('shadow');
    selectedAddressLabelFormElement = ctx;
    // if(selectedAddressLabelFormElement != ctx) {
    //     ctx.classList.add('shadow');
    //     selectedAddressLabelFormElement = ctx;
    // }
    // else {
    //     selectedAddressLabelFormElement = null;
    // }
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 */
const addAddressLabelForm = (ctx) => {
    const parser = new DOMParser();
    const addressLabelForm = parser.parseFromString(addressLabelHTML, 'text/html');

    ctx.appendChild(addressLabelForm.body.firstChild);
}


const removeAddressLabelForm = () => {
    const parent = selectedAddressLabelFormElement.parentElement;

    if(parent.childElementCount > 1) {
        parent.removeChild(selectedAddressLabelFormElement);
    }
}


let selectedAddressLabelImageElement = null;


/**
 * 
 * @param {Element} ctx 
 */
const selectAddressLabelImage = (ctx) => {
    if(selectedAddressLabelImageElement) {
        selectedAddressLabelImageElement.classList.remove('shadow');
    }

    if(selectedAddressLabelImageElement != ctx) {
        ctx.classList.add('shadow');
        selectedAddressLabelImageElement = ctx;
    }
    else {
        selectedAddressLabelImageElement = null;
    }
}


/**
 * 
 * @param {HTMLSelectElement} ctx 
 */
const getSelectedDearTypeValue = (ctx) => {
    const selectIndex = ctx.selectedIndex;

    if (selectIndex != 3) {
        return ctx.options[selectIndex].text;
    }
    else {
        return '';
    }
}


/**
 * 
 * @param {HTMLLIElement} addressLabelForm 
 */
const validAndGetFormsValue = (addressLabelForm) => {
    const postalCodeForm = addressLabelForm.getElementsByClassName('postalCodeForm')[0];
    const addressForm = addressLabelForm.getElementsByClassName('addressForm')[0];
    const roomForm = addressLabelForm.getElementsByClassName('roomForm')[0];
    const dearForm = addressLabelForm.getElementsByClassName('dearForm')[0];
    const dearTypeSelect = addressLabelForm.getElementsByClassName('dearTypeSelect')[0];
    const enclosureForm = addressLabelForm.getElementsByClassName('enclosureForm')[0];
    const expressForm = addressLabelForm.getElementsByClassName('expressForm')[0];

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
    const expressValue = expressForm.value;

    return {
        postalCode: postalCodeValue,
        address: addressValue,
        room: roomValue,
        dear: dearValue,
        dearType: dearTypeValue,
        enclosure: enclosureValue,
        onExpress: expressValue
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
        `;
    }
    else {
        return '';
    }
}

const formatExpressHTML = (onExpress) => {
    if(onExpress) {
        return `
        <div class="col-12 d-flex justify-content-center text-center">
            <div class="bg-danger mb-3" style="width: 85%;">
                <span class="text-danger fs-3 fw-bold bg-white h-100 d-inline-block">【 速  達 】</span>
            </div>
        </div>
        `;
    }
    else {
        return '';
    }
}


/**
 * 
 * @param {object} formsValue 
 */
const formatAddressLabelImageHTML = (formsValue) => {
    const addressLabelImage = `
    <li class="border border-2 p-2 addressLabelImage" onclick="selectAddressLabelImage(this)">
        <div class="row">
            ${formatExpressHTML(formsValue.onExpress)}
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
                        <span class="fs-3">${formsValue.address || HTML_SPACE}</span>
                    </li>
                    <li class="list-group-item border-bottom p-0">
                        <span class="fs-3">${formsValue.room || HTML_SPACE}</span>
                    </li>
                    <li class="list-group-item border-bottom p-0">
                        <span class="fs-3">${formsValue.dear || HTML_SPACE} ${formsValue.dearType}</span>
                    </li>
                </ul>
            </div>
            ${formatEnclosureHTML(formsValue.enclosure)}
        </div>
    </li>
    `;

    const parser = new DOMParser();
    const document = parser.parseFromString(addressLabelImage, 'text/html');

    return document.body.firstChild;
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 * @param {HTMLCollectionOf<HTMLLIElement>} addressLabelFormList
 */
const makeAddressLabel = (ctx, addressLabelFormList) => {
    removeAllChild(ctx);

    for(let addressLabelForm of addressLabelFormList) {
        try {
            const formsValue = validAndGetFormsValue(addressLabelForm);
            const addressLabelImage = formatAddressLabelImageHTML(formsValue);
            ctx.appendChild(addressLabelImage);
        } catch (e){
            console.error(e);
            continue;
        }
    } 
}


const downloadMailLabel = () => {
    if(selectedAddressLabelImageElement) {
        // const labelImage = selectedAddressLabelImageElement.cloneNode(true);
        // labelImage.classList.remove('shadow');
        // selectedAddressLabelImageElement.classList.remove('shadow');

        html2canvas(selectedAddressLabelImageElement)
                   .then((canvas) => {
                        const id = new String(getRandomInt(10000)).padStart(4, '0');
                        const link = document.createElement('a');
                        link.href = canvas.toDataURL();
                        link.download = `mailLabel_${id}.png`

                        link.click();
                   })
        
        selectedAddressLabelImageElement = null;
    }
}


/**
 * 
 * @param {HTMLUListElement} ctx 
 */
const downloadAllMailLabel = (ctx) => {
    for(let element of ctx.childNodes){
        // const labelImage = element.cloneNode(true);
        // labelImage.classList.remove('shadow');
        // element.classList.remove('shadow');

        html2canvas(element)
                .then((canvas) => {
                    const id = new String(getRandomInt(10000)).padStart(4, '0');

                    const link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = `mailLabel_${id}.png`

                    link.click();
                })
    }
}