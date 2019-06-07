function tumbler() {
  if (
    document.getElementById("changeDemension").checked &&
    arrayCords.length > 0
  ) {
    document.getElementsByClassName("twoDemension")[0].style.display = "none";
    implement3DBlock();
  } else {
    document.getElementsByClassName("twoDemension")[0].style.display = "block";
    const threeBlock = document.getElementsByClassName("threeDemension")[0];
    if (threeBlock) {
      document.getElementsByClassName("threeDemension")[0].innerHTML = "";
    }
  }
}
