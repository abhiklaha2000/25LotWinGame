let My_Bets_Pages = 1;
let Game_History_Pages = 1;

const getGameType = () => {
  const urlParams = new URLSearchParams(window.location.search);

  $("#game_type_status").text(`${urlParams.get("game_type") || 1} MIN`);

  return urlParams.get("game_type") || 1;
};

let GAME_TYPE = getGameType();

function totalMoney() {
  console.log("calllltotallll money");
  
  let amount = $(".xvalue").val();
  let money = $(".amount-box").find(".action").attr("value");

  console.log("amount", amount);
  console.log("money", money);
  

  let listJoin = $(".list-join-ao li");

  $(".info-bet").attr("xvalue", amount);
  $(".info-bet").attr("money", money);

  let result = Number(amount) * Number(money);

  console.log("result", result);
  
  $(".result").text(result + "");
}

function totalMoney2() {
  let amount = $(".xvalue").val();
  let money = $(".amount-box").find(".action").attr("value");
  console.log("amount", amount);
  console.log("money", money);

  let listJoin = $('.purple[data="chon-2-so-phu-hop"] .item.action');
  let listJoin2 = $('.num-box.red[data="chon-1-cap-duy-nhat"] .item.action');
  let listJoin3 = $('.num-box.green[data="chon-1-cap-duy-nhat"] .item.action');
  $(".info-bet").attr("xvalue", amount);
  $(".info-bet").attr("money", money);


  let result =
    Number(amount) *
    Number(money) *
    Number(listJoin2.length * listJoin3.length + listJoin.length);
  $(".result").text(result + "");
}

function totalMoney3() {
  let amount = $(".xvalue").val();
  let money = $(".amount-box").find(".action").attr("value");
  console.log("amount", amount);
  console.log("money", money);

  let listJoin = $('.bet-con[game="3"] .item.action');
  let listJoin1 = $(".chon-3-so-giong-nhau .li.action");

  $(".info-bet").attr("xvalue", amount);
  $(".info-bet").attr("money", money);

  let result =
    Number(amount) * Number(money) * Number(listJoin.length + listJoin1.length);
  $(".result").text(result + "");
}

function totalMoney4() {
  let amount = Number($(".xvalue").val());
  let money = Number($(".amount-box").find(".action").attr("value"));

  console.log("amount", amount);
  console.log("money", money);
  let listJoin1 = $('.bet-con[game="4"] .num-box:eq(0) .item.action');
  let listJoinHang1 = listJoin1.length;
  let x1 = 0;
  if (listJoinHang1 >= 3) {
    if (listJoinHang1 == 3) x1 = 1;
    if (listJoinHang1 == 4) x1 = listJoinHang1;
    if (listJoinHang1 == 5) x1 = 10;
    if (listJoinHang1 == 6) x1 = 20;
  }

  let listJoin2 = $('.bet-con[game="4"] .num-box:eq(2) .item.action');

  let listJoinHang2 = listJoin2.length;
  let x2 = 0;
  if (listJoinHang2 >= 2) {
    if (listJoinHang2 <= 3) x2 = 1;
    if (listJoinHang2 == 4) x2 = 6;
    if (listJoinHang2 == 5) x2 = 10;
    if (listJoinHang2 == 6) x2 = 15;
  }

  let listJoin3 = $(".chon-3-so-lien-tiep .li").hasClass("action");
  let x3 = 0;
  if (listJoin3) {
    x3 = 1;
  }

  $(".info-bet").attr("xvalue", amount);
  $(".info-bet").attr("money", money);

  let result = amount * (x1 * money + x2 * money + x3 * money);
  $(".result").text(result + "");
}

const socket = io();
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const initGameHistoryTab = (page = 1) => {
  let size = 10;
  let offset = page === 1 ? 0 : (page - 1) * size;
  let limit = page * size;

  $.ajax({
    type: "POST",
    url: "/api/webapi/k3/GetNoaverageEmerdList",
    data: {
      gameJoin: GAME_TYPE,
      pageno: offset,
      pageto: 10,
    },
    dataType: "json",
    success: function (response) {
      Game_History_Pages = response.page;
      let list_orders = response.data.gameslist;
      $("#period").text(response.period);
      $("#number_result__gameHistory").text(page);
      $(".Loading").fadeOut(0);

      let result = String(list_orders[0].result).split("");

      $(".slot-num-d:eq(0)").attr("class", `slot-num-d num${result[0]}`);
      $(".slot-num-d:eq(1)").attr("class", `slot-num-d num${result[1]}`);
      $(".slot-num-d:eq(2)").attr("class", `slot-num-d num${result[2]}`);

      ShowGameHistory(list_orders);
    },
  });
};
initGameHistoryTab();

function initMyBets(page = 1) {
  let size = 10;
  let offset = page === 1 ? 0 : (page - 1) * size;
  let limit = page * size;
  $.ajax({
    type: "POST",
    url: "/api/webapi/k3/GetMyEmerdList",
    data: {
      gameJoin: GAME_TYPE,
      pageno: offset,
      pageto: 10,
    },
    dataType: "json",
    success: function (response) {
      My_Bets_Pages = response.page;
      let data = response.data.gameslist;
      $("#number_result__myBet").text(page);
      $(".Loading").fadeOut(0);
      ShowMyBets(data);
    },
  });
}
initMyBets();

async function RenderResult(results) {
  for (let i = 0; i < 30; i++) {
    let random1 = Math.floor(Math.random() * 6) + 1;
    $(".slot-num-d:eq(0)").attr("class", `slot-num-d num${random1}`);
    let random2 = Math.floor(Math.random() * 6) + 1;
    $(".slot-num-d:eq(1)").attr("class", `slot-num-d num${random2}`);
    let random3 = Math.floor(Math.random() * 6) + 1;
    $(".slot-num-d:eq(2)").attr("class", `slot-num-d num${random3}`);
    await sleep(50);
  }
  let result = String(results).split("");
  $(".slot-num-d:eq(0)").attr("class", `slot-num-d num${result[0]}`);
  $(".slot-num-d:eq(1)").attr("class", `slot-num-d num${result[1]}`);
  $(".slot-num-d:eq(2)").attr("class", `slot-num-d num${result[2]}`);
  return false;
}

let checkWidth = $("#app").width();
$("html").css("font-size", `${checkWidth / 10}px`);
$(window).resize(() => {
  let checkWidth = $("#app").width();
  $("html").css("font-size", `${checkWidth / 10}px`);
});

$(".circular .li").click(function (e) {
  e.preventDefault();
  $(".van-overlay, .pop-quytac").fadeIn(300);
  $("body").addClass("van-overflow-hidden");
});

//sajal
$(".my_unique_3").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_3").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 3") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_4").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_4").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 4") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_5").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_5").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 5") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_6").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_6").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 6") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_7").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_7").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 7") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".K3B__C-bettingList .my_unique_8").click(function (e) {
  $(".active").removeClass("active");
  $(".my_unique_8").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 8") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".K3B__C-bettingList.my_unique_9").click(function (e) {
  $(".active").removeClass("active");
  $(".my_unique_9").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 9") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".K3B__C-bettingList.my_unique_10").click(function (e) {
  $(".active").removeClass("active");
  $(".my_unique_10").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 10") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_11").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_11").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 11") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_12").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_12").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 12") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_14").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_14").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 13") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_14").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_14").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 14") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_15").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_15").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 15") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_16").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_16").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 16") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_17").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_17").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 17") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_18").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_18").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 18") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_big").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_big").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : big") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_small").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_small").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : small") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_odd").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_odd").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : odd") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_even").click(function (e) {
  $(".K3B__C-bettingList .active").removeClass("active");
  $(".my_unique_even").addClass("active")
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : even") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_11").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 11") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_22").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 22") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_33").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 33") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_44").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 44") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_55").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 55") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_66").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 66") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_11").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 11") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_22").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 22") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_33").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 33") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_44").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 44") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_55").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 44") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_66").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 66") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_1").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 1") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_2").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 2") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_3").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 3") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_4").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 4") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_5").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 5") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_2_same_6").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 6") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_111").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 111") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_222").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 222") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_333").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 333") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_444").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 444") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_555").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 555") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".my_unique_3_same_666").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 666") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".K3B__C-betting3-btn").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 333") // Add the text
  .addClass("new-class"); // Add a new class
});

// different 1st game

let selectedNumbers = []; // Array to store clicked numbers

$(".my_unique_different_1, .my_unique_different_2, .my_unique_different_3, .my_unique_different_4, .my_unique_different_5, .my_unique_different_6").click(function () {
    const number = $(this).attr("data"); // Get the number from the 'data' attribute

    // Check if the number is already in the array
    if (!selectedNumbers.includes(number)) {
        selectedNumbers.push(number); // Add the number to the array
    }

    // If three numbers are selected
    if (selectedNumbers.length === 3) {
        const total = selectedNumbers.join(""); // Combine the numbers into a string (e.g., "123")

        // Trigger the popup and update the content dynamically
        $(".my_personal_popup").css("transform", "translateY(0px)");
        $(".list-join-ao span[game='1']").removeClass("d-none");
        $(".list-join-ao span[game='1']")
            .text(`Total : ${total}`) // Add the dynamic text
            .addClass("new-class"); // Add a new class

        // Reset the array for future selections
        selectedNumbers = [];
    }
});

let selectedDifferentNumbers = []; // Array to store clicked numbers

$(".my_unique_different_2_1, .my_unique_different_2_2, .my_unique_different_2_3, .my_unique_different_2_4, .my_unique_different_2_5, .my_unique_different_2_6").click(function () {
    const number = $(this).attr("data"); // Get the number from the 'data' attribute

    // Check if the number is already in the array
    if (!selectedDifferentNumbers.includes(number)) {
        selectedDifferentNumbers.push(number); // Add the number to the array
    }

    // If two numbers are selected
    if (selectedDifferentNumbers.length === 2) {
        const total = selectedDifferentNumbers.join(""); // Combine the numbers into a string (e.g., "12")

        // Trigger the popup and update the content dynamically
        $(".my_personal_popup").css("transform", "translateY(0px)");
        $(".list-join-ao span[game='1']").removeClass("d-none");
        $(".list-join-ao span[game='1']")
            .text(`Total : ${total}`) // Add the dynamic text
            .addClass("new-class"); // Add a new class

        // Reset the array for future selections
        selectedDifferentNumbers = [];
    }
});


$(".K3B__C-betting4-btn").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 2") // Add the text
  .addClass("new-class"); // Add a new class
});
$(".K3B__C-betting4-tip1").click(function (e) {
  $(".my_personal_popup").css("transform", "translateY(0px)");
  $(".list-join-ao span[game='1']").removeClass("d-none");
  $(".list-join-ao span[game='1']")
  .text("Total : 3") // Add the text
  .addClass("new-class"); // Add a new class
});


// transform: translateY(400px);


$(".pop-quytac button, .pop-quytac-buy button").click(function (e) {
  e.preventDefault();
  $(".van-overlay, .pop-quytac, .pop-quytac-buy").fadeOut(300);
  $("body").removeClass("van-overflow-hidden");
});

function reload_money() {
  fetch("/api/webapi/GetUserInfo")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === false) {
        unsetCookie();
        return false;
      }
      $("#balance_amount").text(`₹ ${data.data.money_user}.00 `);
      $(".Loading").fadeOut(0);
    });
}
reload_money();

$(".reload_money").click(function (e) {
  e.preventDefault();
  $(".Loading").fadeIn(0);
  $(this).addClass("block-click");
  setTimeout(() => {
    $(this).removeClass("block-click");
  }, 2500);
  reload_money();
});

$(".van-notice-bar__content").css("transition-duration", "42s")
setTimeout(() => {
   $(".van-notice-bar__content").css("transform", "translateX(-1872.29px)")
}, 100)

setInterval(() => {
   $(".van-notice-bar__content").css("transition-duration", "0s")
   $(".van-notice-bar__content").css("transform", "translateX(0px)")
   setTimeout(() => {
      $(".van-notice-bar__content").css("transition-duration", "42s")
      $(".van-notice-bar__content").css("transform", "translateX(-1872.29px)")
   }, 100)
}, 42000)

$(".multiple-box .li").click(function (e) {
   e.preventDefault()
   let value = $(this).attr("value")
   console.log("vallll", value);
   
   $(".xvalue").val(value)
   $(".multiple-box .li").removeClass("action")
   $(this).addClass("action")
   let game = $(".K3B__C-nav .active").attr("tab-type")
   if (game == 1) totalMoney()
   if (game == 2) totalMoney2()
   if (game == 3) totalMoney3()
   if (game == 4) totalMoney4()
   let value2 = $(".xvalue").val()
   if (value2 > 1) {
      $(".minus-plus .minus").addClass("action")
   } else {
      $(".minus-plus .minus").removeClass("action")
   }
})

$(".amount-box .li").click(function (e) {
   e.preventDefault()
   console.log("callll 2222222222222");
   
   $(".amount-box .li").removeClass("action")
   $(this).addClass("action")
   let game = $(".K3B__C-nav .active").attr("tab-type")
   console.log("game", game);
   
   if (game == 1) totalMoney()
   if (game == 2) totalMoney2()
   if (game == 3) totalMoney3()
   if (game == 4) totalMoney4()
   let value2 = $(".xvalue").val()
   if (value2 > 1) {
      $(".minus-plus .minus").addClass("action")
   } else {
      $(".minus-plus .minus").removeClass("action")
   }
})

$(".minus-plus .minus").click(function (e) {
   e.preventDefault()
   let value = Number($(".xvalue").val())
   value -= 1
   if (value <= 1) {
      value = 1
      $(this).removeClass("action")
   }
   $(`.multiple-box .li`).removeClass("action")
   $(`.multiple-box .li[value=${value}]`).addClass("action")
   $(".xvalue").val(value)
   let game = $(".K3B__C-nav .active").attr("tab-type")
   if (game == 1) totalMoney()
   if (game == 2) totalMoney2()
   if (game == 3) totalMoney3()
   if (game == 4) totalMoney4()
})

$(".xvalue").on("input", () => {
   let value = $(".xvalue").val()
   if (value == "") {
      $(".minus-plus .minus").removeClass("action")
   } else if (value <= 0) {
      value = 1
      $(".minus-plus .minus").removeClass("action")
   } else if (value > 100) {
      value = 100
   }
   if (value > 1) {
      $(".minus-plus .minus").addClass("action")
   } else {
      $(".minus-plus .minus").removeClass("action")
   }
   $(`.multiple-box .li`).removeClass("action")
   $(`.multiple-box .li[value=${value}]`).addClass("action")
   $(".xvalue").val(value)
   let game = $(".K3B__C-nav .active").attr("tab-type")
   if (game == 1) totalMoney()
   if (game == 2) totalMoney2()
   if (game == 3) totalMoney3()
   if (game == 4) totalMoney4()
})

$(".minus-plus .plus").click(function (e) {
   e.preventDefault()
   let value = Number($(".xvalue").val())
   value += 1
   if (value > 100) {
      value = 100
   }
   $(`.multiple-box .li`).removeClass("action")
   $(`.multiple-box .li[value=${value}]`).addClass("action")
   $(".xvalue").val(value)
   $(".minus-plus .minus").addClass("action")
   let game = $(".K3B__C-nav .active").attr("tab-type")
   if (game == 1) totalMoney()
   if (game == 2) totalMoney2()
   if (game == 3) totalMoney3()
   if (game == 4) totalMoney4()
})

$(".txt-qu-ytac").click(function (e) {
  e.preventDefault();
  $(".pop-quytac-buy").fadeIn(200);
  $(".van-overlay").fadeIn(200);
});

$(".canned").click(function (e) {
  e.preventDefault();
  dropDown();
});

function dropDown() {
  $(".Bet-box li").remove();
  $(".list-join-total .item").find(".li .icon").remove();
  $(".list-join-total .item").find(".li").removeClass("action");
  $(".pop-total").css("transform", "translateY(400px)");
  $('.c-row[game="2_2"], .list-join-ao span[game="2_1"]').addClass("d-none");
  $('.c-row[game="2_2"]').html("");
  $(".Bet-box span").addClass("d-none");
  $('.bet-con[game="2"] .item, .chon-3-so-giong-nhau .li').removeClass(
    "action",
  );
  $('.bet-con[game="3"] .item').removeClass("action");
  $('.bet-con[game="4"] .item').removeClass("action");
  $(".actionBtn").addClass("d-none");
  $(".chon-3-so-lien-tiep .li").removeClass("action");
  $(".confirm").removeClass("block-click");
  $(".result").text("1");
  $(".betting-mark .amount-box .li").removeClass("action");
  $(".betting-mark .amount-box .li:eq(0)").addClass("action");
  $(".betting-mark .multiple-box .li").removeClass("action");
  $(".betting-mark .multiple-box .li:eq(0)").addClass("action");
  $(".xvalue").val(1);
  $(".num-box").find(".icon").remove();
}

var audio1 = new Audio("/audio/di1.da40b233.mp3");
var audio2 = new Audio("/audio/di2.317de251.mp3");

var clicked = false;

function openAudio() {
  audio1.muted = true;
  audio1.play();
  audio2.muted = true;
  audio2.play();
}

$("body").click(function (e) {
  e.preventDefault();
  if (clicked) return;
  openAudio();
  clicked = true;
});

function playAudio1() {
  audio1.muted = false;
  audio1.play();
}

function playAudio2() {
  audio2.muted = false;
  audio2.play();
}

function cownDownTimer() {
  let countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
  setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let checkData = Number(GAME_TYPE);
    let minute = Math.ceil(minutes % checkData);
    let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
    let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
    $(".count_down_d:eq(1)").text(minute);
    $(".count_down_d:eq(2)").text(seconds1);
    $(".count_down_d:eq(3)").text(seconds2);

    if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
      $(".mark-box").show();
      $(".mark-box .item:eq(1)").text(seconds2);
      $(".mark-box").show();
      dropDown();
    }
    if (minute >= 0 && seconds1 >= 1 && seconds2 <= 9) {
      $(".mark-box").hide();
    }
  }, 0);
  setInterval(function () {
    let now = new Date().getTime(); //.toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let checkData = Number(GAME_TYPE);
    let minute = Math.ceil(minutes % checkData);
    let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
    let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
    const check_volume = localStorage.getItem("volume");

    if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
      if (clicked) {
        if (check_volume == "on") {
          playAudio1();
        }
      }
    }

    if (minute == checkData - 1 && seconds1 == 5 && seconds2 >= 9) {
      if (clicked) {
        if (check_volume == "on") {
          playAudio2();
        }
      }
    }
  }, 1000);
}

cownDownTimer();

const issetVolume = localStorage.getItem("volume");
if (issetVolume == null) {
  localStorage.setItem("volume", "on");
}

if (issetVolume == "on") {
  $(".item-volume").attr("src", "/images/volume-up-line.webp");
} else if (issetVolume == "off") {
  $(".item-volume").attr("src", "/images/volume-off-outline.webp");
} else {
  localStorage.setItem("volume", "on");
}

$(".item-volume").click(function (e) {
  e.preventDefault();
  const check_volume = localStorage.getItem("volume");
  if (check_volume == "on") {
    $(this).attr("src", "/images/volume-off-outline.webp");
    localStorage.setItem("volume", "off");
  } else {
    $(this).attr("src", "/images/volume-up-line.webp");
    localStorage.setItem("volume", "on");
  }
});

$(".bet-tab .item").click(function (e) {
  e.preventDefault();
  $(".bet-tab .item").removeClass("active");
  $(this).addClass("active");
  $(".bet-tab .item").removeClass("action");
  $(this).addClass("action");
  let game = $(this).attr("game");

  $(".bet-mark .bet-con").addClass("d-none");
  $(".bet-mark").find(`[game='${game}']`).removeClass("d-none");

  $(".list-join-ao span").addClass("d-none");
  $(".bet-tab .item").removeClass("block-click");
  $(this).addClass("block-click");

  dropDown();
});

$(".list-join-total .item").click(function (e) {
  console.log("calll....K3B__C-nav");
  
  e.preventDefault();
  $('.list-join-ao span[game="1"]').removeClass("d-none");
  $(".pop-total").css("transform", "translateY(0px)");
  let check = $(this).find(".li").hasClass("action");
  if (check == true) {
    $(this).find(".li").removeClass("action");
    $(this).find(".li .icon").remove();

    let html = $(this).find(".li").attr("data-join");
    $(".list-join-ao").find(`[value='${html}']`)[0].remove();
    let count = $(".list-join-ao").find("li");
    if (count.length == 0) {
      dropDown();
    }
    totalMoney();
    return false;
  }
  let html = $(this).find(".li").attr("data-join");
  $(".list-join-ao").append(`
        <li data-v-03b808c2="" value="${html}">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);
  $(`.list-join-ao`).removeClass("d-none");
  $(this).find(".li").addClass("action");
  $(this).find(".li").append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
  totalMoney();
});

// 2 số trùng nhau
$('.bet-con[game="2"] .purple[data="chon-2-so-phu-hop"] .item').click(
  function (e) {
    // Hàng 1
    e.preventDefault();
    $(".pop-total").css("transform", "translateY(0px)");

    let check = $(this).hasClass("action");
    if (check) {
      let data = $(this).attr("data");
      $(`.list-join-ao li[data=${data}]`).remove();
      $(this).removeClass("action");

      let game = $(this).attr("game");
      let count = $(`.list-join-ao li`);
      let count2 = $(`.c-row[game=2_2] li`);
      if (count.length <= 0 && count2.length <= 0) {
        $(`.list-join-ao span[game=${game}]`).addClass("d-none");
        $(".pop-total").css("transform", "translateY(400px)");
        dropDown();
      } else if (count.length <= 0) {
        $(`.list-join-ao span[game=${game}]`).addClass("d-none");
      }
      totalMoney2();
      $(this).find(".icon").remove();
      return false;
    }

    let game = $(this).attr("game");
    let data = $(this).attr("data");

    $(`.list-join-ao`).removeClass("d-none");
    $(`.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

    $(`.list-join-ao span[game=${game}]`).removeClass("d-none");

    $(this).addClass("action");
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
  },
);

function handlingGame2() {
  let hang1 = $('.num-box[hang="1"] .action');
  let hang2 = $('.num-box[hang="2"] .action');
  let html = "";
  let numberHang1 = "";
  let number = "";
  if (hang1.length > 0 && hang2.length > 0) {
    for (let i = 0; i < hang1.length; i++) {
      numberHang1 = hang1[i].innerText;
      for (let i = 0; i < hang2.length; i++) {
        number += String(hang2[i].innerText) + ",";
      }
      number = number.slice(0, -1);
      html += `
                <li data-v-03b808c2="" class="actionRedGreen" data="${numberHang1}">${numberHang1}|${number}</li>
            `;
      numberHang1 = "";
      number = "";
    }
    $(`.c-row[game=2_2]`).html(html);
    $(`.c-row[game=2_2]`).prepend(
      `<span data-v-03b808c2="">Choose a unique pair of numbers：</span>`,
    );
  }
  if (hang1.length <= 0 || hang2.length <= 0) {
    $(`.c-row[game=2_2]`).html("");
    // $(`.c-row[game=2_2]`).prepend(`<span data-v-03b808c2="">Chọn một cặp số duy nhất：</span>`);
  }
}

$('.bet-con[game="2"] .num-box[data="chon-1-cap-duy-nhat"] .item').click(
  async function (e) {
    // Hàng 2
    e.preventDefault();
    let check = $(this).hasClass("action");
    if (check) {
      let data = $(this).attr("data");
      $(`.c-row[game=2_2] li[data=${data}]`).remove();
      $(this).removeClass("action");

      let game = $(this).attr("game");
      await handlingGame2();
      let count = $(`.list-join-ao li`);
      let count2 = $(`.c-row[game=2_2] li`);
      if (count.length <= 0 && count2.length <= 0) {
        $(`.c-row[game=2_2]`).addClass("d-none");
        $(".pop-total").css("transform", "translateY(400px)");
        dropDown();
      } else if (count2.length <= 0) {
        $(`.c-row[game=2_2]`).addClass("d-none");
      }
      totalMoney2();
      $(this).find(".icon").remove();
      return false;
    }

    let number = $(this).attr("number");
    let hang = $(this).parent().attr("hang");
    if (hang == 1) {
      let element = $('.num-box[hang="2"]').find(`[number=${number}]`);
      let check = element.hasClass("action");
      if (check) {
        $('.num-box[hang="2"]')
          .find(`[number=${number}]`)
          .removeClass("action");
        $('.num-box[hang="2"]')
          .find(`[number=${number}]`)
          .find(".icon")
          .remove();
      }
    } else {
      let element = $('.num-box[hang="1"]').find(`[number=${number}]`);
      let check = element.hasClass("action");
      if (check) {
        $('.num-box[hang="1"]')
          .find(`[number=${number}]`)
          .removeClass("action");
        $('.num-box[hang="1"]')
          .find(`[number=${number}]`)
          .find(".icon")
          .remove();
      }
    }

    let game = $(this).attr("game");
    $(`.c-row[game=${game}]`).removeClass("d-none");
    $(`.list-join-ao`).removeClass("d-none");
    $(this).addClass("action");

    let countHang1 = $('.num-box[hang="1"] .action').length;
    let countHang2 = $('.num-box[hang="2"] .action').length;
    if (countHang1 >= 1 && countHang2 >= 1) {
      $(".pop-total").css("transform", "translateY(0px)");
    }
    handlingGame2();
    let count = $(`.list-join-ao li`);
    let count2 = $(`.c-row[game=2_2] li`);
    if (count.length <= 0 && count2.length <= 0) {
      $(`.c-row[game=2_2]`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
    }
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
  },
);

// 3 số trùng nhau
$('.bet-con[game="3"] .item').click(function (e) {
  e.preventDefault();
  let check = $(this).hasClass("action");
  if (check) {
    let data = $(this).attr("data");
    $(`.Bet-box li[data=${data}]`).remove();
    $(this).removeClass("action");

    let count = $(`.list-join-ao li`);
    let check = $(".chon-3-so-giong-nhau .li").hasClass("action");
    if (count.length <= 0 && !check) {
      $(`.list-join-ao[game=3]`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
      dropDown();
    }
    if (count.length <= 0) {
      $(`.list-join-ao span[game="3"]`).addClass("d-none");
    }
    totalMoney3();
    $(this).find(".icon").remove();
    return false;
  }
  let data = $(this).attr("data");
  let game = $(this).parent().parent().attr("game");
  $(`.Bet-box ul span[game=${game}]`).removeClass("d-none");
  $(`.list-join-ao`).removeClass("d-none");
  $(this).addClass("action");
  $(`.Bet-box .list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
  $(".pop-total").css("transform", "translateY(0px)");
  totalMoney3();
  $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$(".chon-3-so-giong-nhau .li").click(function (e) {
  e.preventDefault();
  let check = $(this).hasClass("action");
  if (check) {
    $(this).removeClass("action");
    $(".actionBtn").addClass("d-none");

    let count = $(`.list-join-ao li`);
    let check = $(".chon-3-so-giong-nhau .li").hasClass("action");
    if (count.length <= 0 && !check) {
      $(`.list-join-ao[game=3]`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
      dropDown();
    }
    totalMoney3();
    $(this).find(".icon").remove();
    return false;
  }
  $(".actionBtn").text("Choose 3 identical numbers");
  $(".actionBtn").removeClass("d-none");
  $(this).addClass("action");
  $(".pop-total").css("transform", "translateY(0px)");
  totalMoney3();
  $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

// Khác số
$('.bet-con[game="4"] .num-box:eq(0) .item').click(function (e) {
  e.preventDefault();
  let check = $(this).hasClass("action");
  if (check) {
    let data = $(this).attr("data");
    $(`.Bet-box .list-join-ao li[data=${data}]`).remove();
    $(this).removeClass("action");

    let count = $(`.list-join-ao li`).length;
    let count2 = $(`.Bet-box ul[game="4"] li`).length;
    let check = $(".chon-3-so-lien-tiep .li").hasClass("action");
    if (count < 3 && count2 < 2 && !check) {
      $(`.list-join-ao`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
    }
    if (count < 3) {
      $(`.list-join-ao`).addClass("d-none");
    }
    totalMoney4();
    $(this).find(".icon").remove();
    return false;
  }
  let data = $(this).attr("data");
  let game = $(this).parent().parent().attr("game");
  $(`.list-join-ao`).addClass("d-none");
  $(`.Bet-box ul span[game=${game}]`).removeClass("d-none");
  $(this).addClass("action");
  $(`.Bet-box ul.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
  let count = $(`.Bet-box ul.list-join-ao li`).length;
  if (count >= 3) {
    $(`.list-join-ao`).removeClass("d-none");
    $(".pop-total").css("transform", "translateY(0px)");
  }
  totalMoney4();
  $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$(".chon-3-so-lien-tiep .li").click(function (e) {
  e.preventDefault();
  let check = $(this).hasClass("action");
  if (check) {
    $(this).removeClass("action");
    $(".actionBtn").addClass("d-none");

    let count = $(`.list-join-ao li`);
    let count2 = $(`.Bet-box ul[game="4"] li`).length;
    let count3 = $(`.list-join-ao li`).length;
    let check = $(".chon-3-so-giong-nhau .li").hasClass("action");
    if (count.length <= 0 && count2 < 2 && count3 < 3 && !check) {
      $(`.list-join-ao[game=3]`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
    }
    totalMoney4();
    $(this).find(".icon").remove();
    return false;
  }
  $(".actionBtn").text("Chọn 3 số liên tiếp");
  $(".actionBtn").removeClass("d-none");
  $(this).addClass("action");
  $(".pop-total").css("transform", "translateY(0px)");
  totalMoney4();
  $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.bet-con[game="4"] .num-box:eq(2) .item').click(function (e) {
  e.preventDefault();
  let check = $(this).hasClass("action");
  if (check) {
    let data = $(this).attr("data");
    $(`.Bet-box ul[game="4"] li[data=${data}]`).remove();
    $(this).removeClass("action");

    let count = $(`.Bet-box ul[game="4"] li`).length;
    let count2 = $(`.list-join-ao li`).length;
    let check = $(".chon-3-so-lien-tiep .li").hasClass("action");
    if (count < 2 && count2 < 3 && !check) {
      $(`.Bet-box ul[game="4"]`).addClass("d-none");
      $(".pop-total").css("transform", "translateY(400px)");
    }
    if (count < 2) {
      $(`.Bet-box ul[game="4"]`).addClass("d-none");
    }
    totalMoney4();
    $(this).find(".icon").remove();
    return false;
  }
  let data = $(this).attr("data");
  $(`.Bet-box ul[game="4"]`).removeClass("d-none");
  $(`.Bet-box ul[game="4"] span`).removeClass("d-none");
  $(this).addClass("action");
  $(`.Bet-box ul[game="4"]`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

  let count = $(`.Bet-box ul[game="4"] li`).length;
  if (count >= 2) {
    $(".pop-total").css("transform", "translateY(0px)");
  }
  totalMoney4();
  $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

function alertMess(mess) {
  $("body").append(
    `
      <div data-v-1dcba851="" class="msg">
        <div data-v-1dcba851="" class="msg-content v-enter-active v-enter-to" style=""> ${mess} </div>
      </div>
      `,
  );
  setTimeout(() => {
    $(".msg .msg-content").removeClass("v-enter-active v-enter-to");
    $(".msg .msg-content").addClass("v-leave-active v-leave-to");
    setTimeout(() => {
      $(".msg").remove();
    }, 100);
  }, 1000);
}

function sendGame1() {
  let join = "";
  // let countwe = $('.bet-con[game="1"] .list-join-total .item .action');
  // for (let i = 0; i < countwe.length; i++) {
  //   join += countwe[i].attributes[2].value + ",";
  // }

  let listJoin = $('.K3B__C-bettingList .active').attr("data-join");
  console.log("listJoin", listJoin)
  let xvalue = $(".info-bet").attr("xvalue");
  let money = $(".info-bet").attr("money");
  $.ajax({
    type: "POST",
    url: "/api/webapi/action/k3/join",
    data: {
      listJoin: listJoin,
      game: GAME_TYPE,
      gameJoin: 1,
      xvalue: xvalue,
      money: money,
    },
    dataType: "json",
    success: function (response) {
      alertMess(response.message);
      let change = String(response.change);
      if (response.status) {
        $(".moneyU").text("₹ " + response.money + ".00");
        socket.emit("data-server-3", {
          change,
          gameJoin: 1,
          listJoin,
          money,
          xvalue,
          game: GAME_TYPE,
        });
      }
      dropDown();
    },
  });
}

function sendGame2() {
  let join2 = "";
  let count2 = $(".list-join-ao li");
  for (let i = 0; i < count2.length; i++) {
    join2 += count2[i].innerText + ",";
  }
  let listJoin1 = join2.slice(0, -1);

  let join = "";
  let countwe = $('.Bet-box ul[game="2_2"] .actionRedGreen');
  for (let i = 0; i < countwe.length; i++) {
    join += countwe[i].innerText + "&";
  }

  let listJoin2 = join.slice(0, -1);

  let listJoin = listJoin1 + "@" + listJoin2;

  let xvalue = $(".info-bet").attr("xvalue");
  let money = $(".info-bet").attr("money");
  $.ajax({
    type: "POST",
    url: "/api/webapi/action/k3/join",
    data: {
      listJoin: listJoin,
      game: GAME_TYPE,
      gameJoin: 2,
      xvalue: xvalue,
      money: money,
    },
    dataType: "json",
    success: function (response) {
      alertMess(response.message);
      let change = String(response.change);
      if (response.status) {
        $(".moneyU").text("₹ " + response.money + "");
        socket.emit("data-server-3", {
          change,
          gameJoin: 2,
          listJoin,
          money,
          xvalue,
          game: GAME_TYPE,
        });
      }
      dropDown();
    },
  });
}

function sendGame3() {
  let join = "";
  let countwe = $(".list-join-ao li");
  for (let i = 0; i < countwe.length; i++) {
    join += countwe[i].innerText + ",";
  }
  let listJoin = join.slice(0, -1);

  let check = $(".actionBtn").hasClass("d-none");
  let threeNum = "";
  if (!check) {
    threeNum = "3";
  }
  listJoin = listJoin + "@" + threeNum;
  let xvalue = $(".info-bet").attr("xvalue");
  let money = $(".info-bet").attr("money");
  $.ajax({
    type: "POST",
    url: "/api/webapi/action/k3/join",
    data: {
      listJoin: listJoin,
      game: GAME_TYPE,
      gameJoin: 3,
      xvalue: xvalue,
      money: money,
    },
    dataType: "json",
    success: function (response) {
      alertMess(response.message);
      let change = String(response.change);
      if (response.status) {
        $(".moneyU").text("₹ " + response.money + ".00");
        socket.emit("data-server-3", {
          change,
          gameJoin: 3,
          listJoin,
          money,
          xvalue,
          game: GAME_TYPE,
        });
      }
      dropDown();
    },
  });
}

function sendGame4() {
  let join = "";
  let countwe = $(".list-join-ao li");
  if (countwe.length >= 3) {
    for (let i = 0; i < countwe.length; i++) {
      join += countwe[i].innerText + ",";
    }
  }
  let join2 = "y";
  let countwe2 = $(".actionBtn").hasClass("d-none");
  if (!countwe2) {
    join2 = "u";
  }

  let join3 = "";
  let countwe3 = $('.Bet-box .c-row[game="4"] li');
  if (countwe3.length >= 2) {
    for (let i = 0; i < countwe3.length; i++) {
      join3 += countwe3[i].innerText + ",";
    }
  }

  let listJoin = join.slice(0, -1) + "@" + join2 + "@" + join3.slice(0, -1);
  let xvalue = $(".info-bet").attr("xvalue");
  let money = $(".info-bet").attr("money");
  $.ajax({
    type: "POST",
    url: "/api/webapi/action/k3/join",
    data: {
      listJoin: listJoin,
      game: GAME_TYPE,
      gameJoin: 4,
      xvalue: xvalue,
      money: money,
    },
    dataType: "json",
    success: function (response) {
      alertMess(response.message);
      let change = String(response.change);
      if (response.status) {
        $(".moneyU").text("₹ " + response.money + ".00");
        socket.emit("data-server-3", {
          change,
          gameJoin: 4,
          listJoin,
          money,
          xvalue,
          game: GAME_TYPE,
        });
      }
      dropDown();
    },
  });
}

$(".confirm").click(async function (e) {
  console.log("calllll...");
  
  e.preventDefault();
  $(this).addClass("block-click");
  let game = $(".K3B__C-nav .active").attr("tab-type")
  // let game = $(".bet-tab .action").attr("game");
console.log("game", game)
  if (game == 1) {
    await sendGame1();
  } else if (game == 2) {
    await sendGame2();
  } else if (game == 3) {
    await sendGame3();
  } else if (game == 4) {
    await sendGame4();
  }
  initMyBets();
});

// ------------------ Tab handling Logic -------------------

const TAB_NAME_MAP = {
  GAME_HISTORY: "GAME_HISTORY",
  TREND: "TREND",
  MY_BETS: "MY_BETS",
};

const setActiveTab = (selectedTabName) => {
  $("#game_history_tab").removeClass("active");
  $("#trend_tab").removeClass("active");
  $("#my_bets_tab").removeClass("active");

  $("#game_history_tab_button .tab_nav_button_inner").removeClass("action");
  $("#trend_tab_button .tab_nav_button_inner").removeClass("action");
  $("#my_bets_tab_button .tab_nav_button_inner").removeClass("action");
  if (TAB_NAME_MAP.GAME_HISTORY === selectedTabName) {
    $("#game_history_tab").addClass("active");
    $("#game_history_tab_button .tab_nav_button_inner").addClass("action");
  }
  if (TAB_NAME_MAP.TREND === selectedTabName) {
    $("#trend_tab").addClass("active");
    $("#trend_tab_button .tab_nav_button_inner").addClass("action");
  }
  if (TAB_NAME_MAP.MY_BETS === selectedTabName) {
    $("#my_bets_tab").addClass("active");
    $("#my_bets_tab_button .tab_nav_button_inner").addClass("action");
  }
};

$("#game_history_tab_button").click(function (e) {
  e.preventDefault();
  initGameHistoryTab();
  setActiveTab(TAB_NAME_MAP.GAME_HISTORY);
});

// $("#trend_tab_button").click(function (e) {
//    e.preventDefault()

//    setActiveTab(TAB_NAME_MAP.TREND)

//    $.ajax({
//       type: "POST",
//       url: "/api/webapi/GetNoaverageEmerdList",
//       data: {
//          typeid: GAME_TYPE_ID,
//          pageno: "0",
//          pageto: "10",
//          language: "vi",
//       },
//       dataType: "json",
//       success: function (response) {
//          let list_orders = response.data.gameslist
//          showTrendData(list_orders)
//       },
//    })
// })

$("#my_bets_tab_button").click(function (e) {
  e.preventDefault();
  initMyBets();
  setActiveTab(TAB_NAME_MAP.MY_BETS);
});

// ------------------ Tab handling Logic -------------------end
