let websiteNameInput = document.getElementById("websiteName");
let websiteUrlInput = document.getElementById("websiteUrl");


let validate = {
    websiteName: /^[\w]{3,}$/,
    websiteUrl: /^(https:\/\/|http:\/\/)?(www\.)?[\w]{3,20}(\.com)$/,
}


let websiteArr= [];
let websiteID = 0;

{
    let storageContent = JSON.parse(localStorage.getItem("Websites")); 
    if (storageContent != null && storageContent.length > 0)
    {
        websiteArr = storageContent;
        websiteID = websiteArr[websiteArr.length - 1].id + 1;
        display(websiteArr);
    }

}


function addItem()
{
    if (validation())
    {
        let obj =
        {
            id: websiteID, 
            websiteName: websiteNameInput.value,
            websiteUrl: websiteUrlInput.value,
        };

        websiteArr.push(obj);
        localStorage.setItem("Websites", JSON.stringify(websiteArr));
        display(websiteArr);
        clearInput();
        websiteID++;

        clearValidateEffect();
    }
    
}

function validation()
{
    let flagName = true;
    let flagUrl = true;
    if (validate.websiteName.test(websiteNameInput.value) == false)
    {

        document.getElementById("websiteNameValidate").classList.remove("d-none")
        flagName = false;
    }
    if (validate.websiteUrl.test(websiteUrlInput.value) == false)
    {
        
        document.getElementById("websiteUrlValidate").classList.remove("d-none")
        flagUrl = false;
    }
    

    if (flagName)
    {document.getElementById("websiteNameValidate").classList.add("d-none");}
    if (flagUrl)
    { document.getElementById("websiteUrlValidate").classList.add("d-none"); }
    

    return flagName && flagUrl;
}

function display(arr)
{
    let x = '';
    for (i = 0; i < arr.length; i++)
    {
        x += `
            <tr>
                <td>${i+1}</td>
                <td>${arr[i].websiteName}</td>
                <td>
                    <a href="https://${arr[i].websiteUrl}/" target="_blank" class="buttonStyle" id="btnvisit">
                        <i class="fa-solid fa-eye pe-1"></i>
                        ${window.innerWidth < 768 ? '' : '<span>Visit</span>'} 
                        </a>
                    </a>
                </td>
                <td>
                    <button class="btn btn-warning me-1 buttonStyle" id="btnUpdateFirst" onclick="updateFirst(${arr[i].id})">
                        <i class="fa-solid fa-marker pe-1"></i>
                        ${window.innerWidth < 768 ? '' : '<span>Update</span>'} 
                        </a>
                    </button>
                    <button class="btn btn-danger buttonStyle" id="btnDelete" onclick="deleteItem(${arr[i].id})">
                        <i class="fa-solid fa-trash pe-1"></i>
                        ${window.innerWidth < 768 ? '' : '<span>Delete</span>'} 
                    </button>
                </td>
            </tr>
        `
    }
    document.getElementById("container").innerHTML = x;
}

function clearInput()
{
    websiteNameInput.value = '';
    websiteUrlInput.value = '';
}

function clearValidateEffect()
{
    websiteNameInput.classList.remove("is-invalid", "is-valid");
    websiteUrlInput.classList.remove("is-invalid", "is-valid");
}



function deleteItem(index) {
    websiteArr.splice(index, 1);
    for (let i = index; i < websiteArr.length; i++)
    {
        websiteArr[i].id -= 1;
    }
    localStorage.setItem("Websites", JSON.stringify(websiteArr));
    display(websiteArr);
    websiteID--;
}


let updatedIndex;
function updateFirst(index)
{
    updatedIndex = index;
    websiteNameInput.value = websiteArr[index].websiteName;
    websiteUrlInput.value = websiteArr[index].websiteUrl;
    document.getElementById("btnSubmit").classList.add("d-none");
    document.getElementById("btnUpdate").classList.remove("d-none");

    clearValidateEffect();
}

function update()
{
    if (validation())
    {
        websiteArr[updatedIndex].websiteName = websiteNameInput.value;
        websiteArr[updatedIndex].websiteUrl = websiteUrlInput.value;

        localStorage.setItem("Websites", JSON.stringify(websiteArr));
        display(websiteArr);

        document.getElementById("btnSubmit").classList.remove("d-none");
        document.getElementById("btnUpdate").classList.add("d-none");

        clearValidateEffect();
        clearInput();
    }
}


function validateInputs(input)
{
    if (validate[input.id].test(input.value) == false)
    {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        
        }
    else
    {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
}

window.addEventListener("resize", function() {
    display(arr); 
  });

  window.onresize = display(arr);

