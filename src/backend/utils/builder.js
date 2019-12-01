'use strict';

const buildResponse = (outputs) => {
  return JSON.stringify({
    version: "2.0",
    template: {
      outputs: outputs
    }
  });
}

const getButton = (label, action, data, blockId=undefined, extra=undefined) => {
  const actionTypes = ["webLink", "osLink", "message", "phone", "share", "block"];

  if (actionTypes.includes(action)) {
    var button = {
      label: label,
      action: action
    };
    switch (action) {
      case "webLink": button["webLinkUrl"] = data; break;
      case "osLink": button["osLink"] = data; break;
      case "message": button["messageText"] = data; break;
      case "phone": button["phoneNumber"] = data; break;
      case "block": button["messageText"] = data;
                    button["blockId"] = blockId;
                    if (extra !== undefined) button["extra"] = extra;
    }
    return button;
  } else {
    throw "action type error";
  }
}

const getThumbnail = (imageUrl) => {
  return {
    imageUrl: imageUrl
  };
}

const getListItem = (title, description=undefined, imageUrl=undefined, link=undefined) => {
  var listItem = {
    title: title,
  }
  if (description !== undefined) listItem["description"] = description;
  if (imageUrl !== undefined) listItem["imageUrl"] = imageUrl;
  if (link !== undefined) listItem["link"] = link;
  return listItem;
}

const getSimpleText = (text) => {
  return {
    simpleText: {
      text: text
    }
  };
}

const getSimpleImage = (imageUrl, altText="") => {
  return {
    simpleImage: {
        imageUrl: imageUrl,
        altText: altText
    }
  };
}

const getBasicCardBody = (title, description, thumbnail, buttons=[]) => {
  return {
    title: title,
    description: description,
    thumbnail: thumbnail,
    buttons: buttons
  };
}

const getBasicCard = (title, description, thumbnail, buttons=[]) => {
  return {
    basicCard: getBasicCardBody(title, description, thumbnail, buttons)
  };
}

const getListCard = (title, titleImageUrl, listItems, buttons=[]) => {
  return {
    listCard: {
      header: {
        title: title,
        imageUrl: titleImageUrl
      },
      items: listItems,
      buttons: buttons
    }
  };
}

const getCarousel = (type, cards) => {
  const cardTypes = ["basicCard", "commerceCard"];

  if (cardTypes.includes(type)) {
    return {
      carousel: {
        type: type,
        items: cards
      }
    };
  } else {
    throw "card type error";
  }
}

module.exports = {
  buildResponse,
  getButton,
  getThumbnail,
  getListItem,
  getSimpleText,
  getSimpleImage,
  getBasicCardBody,
  getBasicCard,
  getListCard,
  getCarousel
}
