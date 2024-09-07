function BalfBasket(s){
  var b = this;
  var sessionItems = s;
  var items = {};
  var discount = "";

  //Will return all non-session added items
  this.GetItems = function(){
    return items;
  };
  //Adds an item to the basket
  this.AddToBasket = function(id, q, price){
    qty = parseInt(q);

    var newqty = 0;
    if(items.hasOwnProperty(id)){
      newqty = items[id] + qty;
    } else{
      newqty = qty;
    }
    items[id] = newqty;

    newqty = 0;
    if(sessionItems.hasOwnProperty(id)){
      newqty = parseInt(sessionItems[id]) + qty;
    } else{
      newqty = qty;
    }
    sessionItems[id] = newqty;

    document.cookie = "basket=" + JSON.stringify(items) + "; expires=0; path=/";

    return newqty;
  };

  this.GetItemCount = function(){
    var total = 0;
    for(var i in sessionItems){
      total += parseInt(sessionItems[i]);
    }
    return total;
  };

  //Updates the temporary basket with the new count of items to be added
  this.UpdateQuantity = function(id, qty){
    var c = sessionItems[id];
    //This will be negative if items are being removed
    items[id] = qty - c;
    sessionItems[id] = qty;
    document.cookie = "basket=" + JSON.stringify(items) + "; expires=0; path=/";
  }


  this.SetDiscountCode = function(code){
    this.discount = code;
  };

  //Submits the basket
  this.Submit = function(path){

    var form = document.createElement("form");
    form.method = "POST";
    form.action = path;

    //Checks if there is a discount code
    if(this.discount != ""){
      var i = document.createElement("input");
      i.setAttribute("hidden", '');
      i.setAttribute("value", this.discount);
      i.name = "discount_code";
      form.appendChild(i);
    }

    for (var prop in sessionItems) {
      if(sessionItems.hasOwnProperty(prop)){
        var i = document.createElement("input");
        i.setAttribute("hidden", '');
        i.setAttribute("value", sessionItems[prop]);
        i.name = prop;
        form.appendChild(i);
      }
    }
    document.body.appendChild(form);
    form.submit();
  }

  return this;
};
