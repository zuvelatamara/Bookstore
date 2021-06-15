<template>
  <div class="products-wrapper">
    <div class="products-title">
      <h1>Select Book Genre to see all Books</h1>
    </div>
    <div class="single-product">
      <div @click="goToRomanceProducts" class="left-single-product romance-product">
        <h1 class="single-product-title">Romance</h1>
      </div>
      <div @click="goToScifiProducts" class="right-single-product scifi-product">
        <h1 class="single-product-title">Sci-Fi</h1>
      </div>
      <div @click="goToHorrorProducts" class="left-single-product horror-product">
        <h1 class="single-product-title">Horror</h1>
      </div>
      <div @click="goToClassicsProducts" class="right-single-product classics-product">
        <h1 class="single-product-title">Classics</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToRomanceProducts() {
    this.$router.push('/products/romance-products');
  },
  goToHorrorProducts() {
    this.$router.push('/products/horror-products');
  },
  goToScifiProducts() {
    this.$router.push('/products/scifi-products');
  },
  goToClassicsProducts() {
    this.$router.push('/products/classics-products');
  }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.products-wrapper {
  height: 100%;
  width: 100%;
  background: rgb(202, 202, 202);
  display: flex;
  flex-direction: column;
}
.products-title {
  font-family: 'Mate SC', 'cursive';
  font-size: 25px;
  align-self: center;
  padding-top: 40px;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.single-product {
  height: 520px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.left-single-product {
  align-self: flex-start;
  width: 50%;
  height: 50%;
  border: 3px solid darkgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.85;
}
.right-single-product {
  align-self: flex-end;
  width: 50%;
  height: 50%;
  border: 3px solid darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    opacity: 0.85;
}
.single-product-title {
  font-family: 'Mate SC', 'cursive';
  font-size: 35px;
  color: white;
  text-shadow: 2px 2px black;

}
.romance-product {
  background-image: url('../../assets/romance.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.horror-product {
  background-image: url('../../assets/horror.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.scifi-product {
  background-image: url('../../assets/scifi.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.classics-product {
  background-image: url('../../assets/classics.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.left-single-product:hover {
  opacity: 100%;
  transition: 0.3s ease;
  cursor: pointer;
}
.right-single-product:hover {
  opacity: 100%;
  transition: 0.3s ease;
  cursor: pointer;
}
</style>
