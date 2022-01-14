// $(document).ready(function () {
//     (function () {
//         let adaptivItems = $("[data-adaptiv]");
//         let defaultPlace = [];
//         // console.log(defaultPlace);

//         let adaptivItemsArray = [];

//         let adaptivMatch = [];
//         //Заполняем массивы
//         if (adaptivItems.length > 0) {
//             let index = 0;
//             $.each(adaptivItems, function (i, val) {
//                 const adaptivElement = adaptivItems[i];
//                 const adaptivMove = $(adaptivElement).attr("data-adaptiv");
//                 if (adaptivMove != "") {
//                     const adaptivArray = adaptivMove.split(",");
//                     const adaptivPlace = adaptivArray[1] ? adaptivArray[1].trim() : "last";
//                     const adaptivBreakpoint = adaptivArray[2]
//                         ? adaptivArray[2].trim()
//                         : "768";
//                     const adaptivType =
//                         adaptivArray[3] === "min" ? adaptivArray[3].trim() : "max";
//                     const adaptivDestination = $("." + adaptivArray[0].trim());
//                     if (adaptivArray.length > 0 && adaptivDestination) {
//                         $(adaptivElement).attr("data-adaptiv-i", index);
//                         //Заполняем массив первоначальных позиций
//                         defaultPlace[index] = {
//                             parent: adaptivElement.parentNode,
//                             i: indexParent(adaptivElement),
//                         };
//                         //Заполняем массив элементов
//                         adaptivItemsArray[index] = {
//                             element: adaptivElement,
//                             destination: $("." + adaptivArray[0].trim())[0],
//                             place: adaptivPlace,
//                             breakpoint: adaptivBreakpoint,
//                             type: adaptivType,
//                         };
//                         index++;
//                     }
//                 }
//             })
//             SortAdapt(adaptivItemsArray);

//             //Создаем события в точке брейкпоинта
//             $.each(adaptivItemsArray, function (i, val) {
//                 const element = adaptivItemsArray[i];
//                 const adaptivBreakpoint = element.breakpoint;
//                 const adaptivType = element.type;

//                 adaptivMatch.push(
//                     window.matchMedia(
//                         "(" + adaptivType + "-width: " + adaptivBreakpoint + "px)"
//                     )
//                 );
//                 adaptivMatch[i].addListener(funcAdapt);
//             })
//         }
//         //Основная функция
//         function funcAdapt() {
//             $.each(adaptivItemsArray, function (i, val) {
//                 const element = adaptivItemsArray[i];
//                 const adaptivElement = element.element;
//                 const adaptivDestination = element.destination;
//                 const adaptivPlace = element.place;
//                 const adaptivBreakpoint = element.breakpoint;
//                 const adaptClass = "adapt_" + adaptivBreakpoint;

//                 if (adaptivMatch[i].matches) {
//                     if (!$(adaptivElement).hasClass(adaptClass)) {
//                         let actualIndex = adaptivPlace;

//                         if (adaptivPlace === "first") {
//                             actualIndex = indexGetParentArr(adaptivDestination)[0];
//                         } else if (adaptivPlace === "last") {
//                             actualIndex = indexGetParentArr(adaptivDestination).length;
//                         }

//                         $(adaptivDestination.children[actualIndex]).before(adaptivElement)
//                         $(adaptivElement).addClass(adaptClass);
//                     }
//                 } else {
//                     if ($(adaptivElement).hasClass(adaptClass)) {
//                         backElement(adaptivElement);
//                         $(adaptivElement).removeClass(adaptClass);
//                     }
//                 }
//             })
//         }

//         //Вызов основной функции
//         funcAdapt();

//         //Функция возврата на место
//         function backElement(element) {
//             const Index = $(element).attr("data-adaptiv-i");
//             const originalPlace = defaultPlace[Index];
//             const parentPlace = originalPlace["parent"];
//             const indexPlace = originalPlace["i"];
//             const actualIndex = indexGetParentArr(parentPlace, true)[indexPlace];
//             // $(parentPlace.children[actualIndex]).before(element);
//             parentPlace.insertBefore(element, parentPlace.children[actualIndex]);
//         }
//         //Функция получения индекса внутри родителя
//         function indexParent(element) {
//             return $(element).index()
//         }
//         //Функция получения массива индексов элементов внутри родителя
//         function indexGetParentArr(parent, back) {
//             const children = parent.children;
//             console.log(children);
//             const childrenArray = [];
//             $.each(children, function (i, val) {
//                 const childrenElement = children[i];
//                 if (back) {
//                     childrenArray.push(i);
//                 } else {
//                     //Исключая перенесенный элемент
//                     if ($(childrenElement).attr("data-adaptiv") == null) {
//                         childrenArray.push(i);
//                     }
//                 }
//             })
//             return childrenArray;
//         }
//         //Сортировка объекта
//         function SortAdapt(arr) {
//             arr.sort(function (a, b) {
//                 if (a.breakpoint > b.breakpoint) {
//                     return -1;
//                 } else {
//                     return 1;
//                 }
//             });
//             arr.sort(function (a, b) {
//                 if (a.place > b.place) {
//                     return 1;
//                 } else {
//                     return -1;
//                 }
//             });
//         }
//     })();
// })