<template>
  <div class="container">
    <div id="title">
      Hotel Creation Form
    </div>
    <a v-if="!data.stripeCode" href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CeKJ9bzvcfEd3aE9rMlSyCLzadjC6XAy&scope=read_write">
      <button class="btn btn-info">Connect Stripe Account</button>
    </a>
    <form v-else>
      <div class="form-inline">
        <label for="hotelName">Hotel Name</label>
        <input v-model="data.hotel.name" type="text" class="form-control" id="hotelName">
      </div>
      <div class="form-inline">
        <label for="hotelRoomType">Room Type</label>
        <input v-model="data.hotel.roomType" type="text" class="form-control" id="hotelRoomType" value="Standard">
      </div>
      <div class="form-inline">
        <label for="adminFirstName">Admin First Name</label>
        <input v-model="data.admin.firstName" type="text" class="form-control" id="adminFirstName">
      </div>
      <div class="form-inline">
        <label for="adminLastName">Admin Last Name</label>
        <input v-model="data.admin.lastName" type="text" class="form-control" id="adminFirstName">
      </div>
      <div class="form-inline">
        <label for="adminEmail">Admin Email Address</label>
        <input v-model="data.admin.email" type="email" class="form-control" id="adminEmail">
      </div>
      <div class="form-inline">
        <label for="adminPhone">Admin Phone Number</label>
        <input v-model="data.admin.phoneNumber" type="number" class="form-control" id="adminPhone">
      </div>
      <div class="form-inline">
        <label for="adminPassword">Admin Password</label>
        <input v-model="data.admin.password" type="text" class="form-control" id="adminPassword">
      </div>
      <div v-if="alert.shouldDisplay">
        <div v-if="alert.success" class="alert alert-success">
          Successfully created hotel! <br />
          Hotel ID: {{ alert.response.body.hotelId }} <br />
          Admin ID: {{ alert.response.body.id }}
        </div>
        <div v-else class="alert alert-danger">
          Error in creating hotel. <br />
          Error Status: {{ alert.response.status}}<br />
          Error Text: {{ alert.response.statusText }}
        </div>
      </div>
      <button @click="handleSubmit" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

const INITIAL_DATA = {
  data: {
    admin: {
      email: '',
      firstName: '',
      lastName: '',
      password: 'password1234',
      phoneNumber: ''
    },
    hotel: {
      name: '',
      roomType: '',
    },
    stripeCode: null
  },
  alert: {
    shouldDisplay: false,
    success: true,
    response: null
  },
}

export default {
  name: 'HotelForm',
  data: () => ({...INITIAL_DATA}),
  created: function () {
    const code = window.location.href.split('code=')[1]
    if (code) {
      this.data.stripeCode = code
    }
  },
  methods: {
    transformResponseToState: function (response) {
      if (response.ok) {
        return {
          shouldDisplay: true,
          success: true,
          response
        }
      } else {
        return {
          shouldDisplay: true,
          success: false,
          response
        }
      }
    },
    submitForm: function (data) {
      const baseURL = `http://localhost:5050`
      const endpoint = `/api/hotels`
      return this.$http.post(baseURL+endpoint, data)
    },
    handleSubmit: function (e) {
      e.preventDefault()
      this.submitForm(this.data).then(response => {
        this.alert = this.transformResponseToState(response)
        this.data = {
          admin: {
            email: '',
            firstName: '',
            lastName: '',
            password: 'password1234',
            phoneNumber: ''
          },
          hotel: {
            name: '',
            roomType: '',
          },
          stripeCode: null
        }
      }, response => {
        this.alert = this.transformResponseToState(response)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    max-width: 500px;
    color: white;
  }

  #title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .form-inline {
    margin: 10px 0;
  }

  label {
    width: 250px;
    text-align: left;
  }

  input {
    color: black;
    font-weight: 500;
  }

  button {
    margin-top: 20px;
  }

</style>
