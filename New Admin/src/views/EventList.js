/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  Badge,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

const sampleSummary = {
  MostBookedArray: [
    {
      tags: ["music", "vertigo"],
      tickets: ["60ff0f3e1b81bd4940168040"],
      reviews: [],
      _id: "60ff0f181b81bd494016803c",
      name: "Vertigo",
      category: "Music Concert",
      date: "2021-07-30T19:36:00.000Z",
      time: "15:09",
      duration: "60",
      description: "xcvb",
      contact: "123456",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
      coordinates: {
        lat: 6.9108534,
        lng: 79.8633728,
      },
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 19,
      payToPlatform: 22.575,
      totRevenue: 451.5,
      payToHost: 190,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T20:08:44.574Z",
      __v: 2,
      visits: 55,
    },
    {
      tags: ["music", "ultra music festival 2021"],
      tickets: ["60ff10a31b81bd4940168047"],
      reviews: [],
      _id: "60ff10881b81bd4940168045",
      name: "it18032598",
      category: "Music Concert",
      date: "2021-07-30T19:42:00.000Z",
      time: "16:15",
      duration: "60",
      description: "sdfghjkl",
      contact: "2345678",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
      coordinates: {
        lat: 6.847491199999999,
        lng: 79.9242548,
      },
      address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Youth Center Theater Budling",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 5,
      payToPlatform: 4.095000000000001,
      totRevenue: 81.9,
      payToHost: 65,
      rates: [
        {
          _id: "61006958727a53848014a080",
        },
      ],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-27T12:51:54.542Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-27T12:51:48.601Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
  ],
  MostPopularEvents: [
    {
      tags: ["music", "vertigo"],
      tickets: ["60ff0f3e1b81bd4940168040"],
      reviews: [],
      _id: "60ff0f181b81bd494016803c",
      name: "Vertigo",
      category: "Music Concert",
      date: "2021-07-30T19:36:00.000Z",
      time: "15:09",
      duration: "60",
      description: "xcvb",
      contact: "123456",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
      coordinates: {
        lat: 6.9108534,
        lng: 79.8633728,
      },
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 19,
      payToPlatform: 22.575,
      totRevenue: 451.5,
      payToHost: 190,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T20:08:44.574Z",
      __v: 2,
      visits: 55,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
    {
      tags: ["music", "ultra music festival 2021"],
      tickets: ["60ff10a31b81bd4940168047"],
      reviews: [],
      _id: "60ff10881b81bd4940168045",
      name: "it18032598",
      category: "Music Concert",
      date: "2021-07-30T19:42:00.000Z",
      time: "16:15",
      duration: "60",
      description: "sdfghjkl",
      contact: "2345678",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
      coordinates: {
        lat: 6.847491199999999,
        lng: 79.9242548,
      },
      address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Youth Center Theater Budling",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 5,
      payToPlatform: 4.095000000000001,
      totRevenue: 81.9,
      payToHost: 65,
      rates: [
        {
          _id: "61006958727a53848014a080",
        },
      ],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-27T12:51:54.542Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-27T12:51:48.601Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
  ],
  TrendingTopicEvents: [
    {
      tags: ["music", "vertigo"],
      tickets: ["60ff0f3e1b81bd4940168040"],
      reviews: [],
      _id: "60ff0f181b81bd494016803c",
      name: "Vertigo",
      category: "Music Concert",
      date: "2021-07-30T19:36:00.000Z",
      time: "15:09",
      duration: "60",
      description: "xcvb",
      contact: "123456",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
      coordinates: {
        lat: 6.9108534,
        lng: 79.8633728,
      },
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 19,
      payToPlatform: 22.575,
      totRevenue: 451.5,
      payToHost: 190,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T20:08:44.574Z",
      __v: 2,
      visits: 55,
    },
    {
      tags: ["music", "ultra music festival 2021"],
      tickets: ["60ff10a31b81bd4940168047"],
      reviews: [],
      _id: "60ff10881b81bd4940168045",
      name: "it18032598",
      category: "Music Concert",
      date: "2021-07-30T19:42:00.000Z",
      time: "16:15",
      duration: "60",
      description: "sdfghjkl",
      contact: "2345678",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
      coordinates: {
        lat: 6.847491199999999,
        lng: 79.9242548,
      },
      address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Youth Center Theater Budling",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 5,
      payToPlatform: 4.095000000000001,
      totRevenue: 81.9,
      payToHost: 65,
      rates: [
        {
          _id: "61006958727a53848014a080",
        },
      ],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
  ],
  TrendingTopic: "Music Concert",
  AllEvents: [
    {
      tags: ["music", "vertigo"],
      tickets: ["60ff0f3e1b81bd4940168040"],
      reviews: [],
      _id: "60ff0f181b81bd494016803c",
      name: "Vertigo",
      category: "Music Concert",
      date: "2021-07-30T19:36:00.000Z",
      time: "15:09",
      duration: "60",
      description: "xcvb",
      contact: "123456",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
      coordinates: {
        lat: 6.9108534,
        lng: 79.8633728,
      },
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 19,
      payToPlatform: 22.575,
      totRevenue: 451.5,
      payToHost: 190,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T20:08:44.574Z",
      __v: 2,
      visits: 55,
    },
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-27T12:51:54.542Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "ultra music festival 2021"],
      tickets: ["60ff10a31b81bd4940168047"],
      reviews: [],
      _id: "60ff10881b81bd4940168045",
      name: "it18032598",
      category: "Music Concert",
      date: "2021-07-30T19:42:00.000Z",
      time: "16:15",
      duration: "60",
      description: "sdfghjkl",
      contact: "2345678",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
      coordinates: {
        lat: 6.847491199999999,
        lng: 79.9242548,
      },
      address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Youth Center Theater Budling",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 5,
      payToPlatform: 4.095000000000001,
      totRevenue: 81.9,
      payToHost: 65,
      rates: [
        {
          _id: "61006958727a53848014a080",
        },
      ],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-27T12:51:48.601Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
  ],
  TopGrosssingArray: [
    {
      tags: ["music", "vertigo"],
      tickets: ["60ff0f3e1b81bd4940168040"],
      reviews: [],
      _id: "60ff0f181b81bd494016803c",
      name: "Vertigo",
      category: "Music Concert",
      date: "2021-07-30T19:36:00.000Z",
      time: "15:09",
      duration: "60",
      description: "xcvb",
      contact: "123456",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
      coordinates: {
        lat: 6.9108534,
        lng: 79.8633728,
      },
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 19,
      payToPlatform: 22.575,
      totRevenue: 451.5,
      payToHost: 190,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T20:08:44.574Z",
      __v: 2,
      visits: 55,
    },
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-27T12:51:54.542Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "ultra music festival 2021"],
      tickets: ["60ff10a31b81bd4940168047"],
      reviews: [],
      _id: "60ff10881b81bd4940168045",
      name: "it18032598",
      category: "Music Concert",
      date: "2021-07-30T19:42:00.000Z",
      time: "16:15",
      duration: "60",
      description: "sdfghjkl",
      contact: "2345678",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
      coordinates: {
        lat: 6.847491199999999,
        lng: 79.9242548,
      },
      address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Youth Center Theater Budling",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 5,
      payToPlatform: 4.095000000000001,
      totRevenue: 81.9,
      payToHost: 65,
      rates: [
        {
          _id: "61006958727a53848014a080",
        },
      ],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-27T12:51:48.601Z",
      __v: 1,
      visits: 0,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
  ],
  MostActiveCustomers: [
    {
      notifications: [],
      _id: "6100ada90d896d3cf020deeb",
      username: "admin98765432375",
      password: "$2b$10$.YV5.ng7ITZyPwB5bV3XCeKBnKt0IqcV3Px5uujmRNnW/LtmeaE1e",
      email: "ravioscar2@hotmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      bookings: 0,
      categories: [],
      __v: 0,
    },
    {
      notifications: [],
      _id: "60c08aa5cd159e10a8c81565",
      username: "RavinduJayan",
      password: "$2b$10$vlDTfLyNd.THRHq1ihORxOu6r5T/ROn9rq6SgaODGRDWe6astpqH2",
      email: "Jayan@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 0,
      about: "Good",
      address: "501/A, High Level Road,Naduhena, Meegoda.",
      city: "Colombo 2",
      mobile: "0112545689",
      province: "Colombo",
      categories: [],
    },
    {
      notifications: ["60fc9b78bad1b2138c7c34af"],
      _id: "60fc05342a8806397c070de5",
      username: "Ravindu",
      password: "$2b$10$tTvHtGEHOGsnDJTtVt0R/eIChmGtBdqzLrUgr5y10FpCKORfNsj/y",
      email: "ravindudeshaninfo@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 2,
      categories: [
        {
          _id: "60ff11be6e66024f2cb340c5",
          name: "Music Concert",
          score: 2,
        },
      ],
    },
    {
      notifications: ["60fe543976e7b05d44b91f61"],
      _id: "60fcd3a6bad1b2138c7c34b0",
      username: "Ravindu9865",
      password: "$2b$10$EvzZwwYObcdpCbGW6pHD8eYtV3sNKo2KKcmVBIbA7Af66Io.EiCqe",
      email: "ravindudeshan865@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 1,
      categories: [],
    },
    {
      notifications: ["60ed8bc9514caa504858cd12", "60ed8c5c6b2de47a7c9022a4"],
      _id: "60ed8aed82991a1cbca0bdb4",
      notification: [],
      username: "Victor",
      password: "$2b$10$6f.m6B.FZGX4JlM9umjFHe.fR418xhKciHmcCFVGFEvdKvNR8FcJK",
      email: "ravioscar1@gmail.com",
      firstname: "Victor",
      lastname: "Victor Climon",
      __v: 2,
      categories: [],
    },
    {
      notifications: [],
      _id: "60c0874fcd159e10a8c81562",
      username: "Kavindu",
      password: "$2b$10$WNwRCR/bQhx9qC68E5K0qubViMbvlVSNey0/CBtzvwtvZQLCciF.a",
      email: "Kavindu@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 0,
      about: "Im good",
      address: "501/A, High Level Road,Naduhena, Meegoda.",
      city: "Colombo",
      mobile: "0112562358",
      province: "10504",
      categories: [],
    },
    {
      notifications: [],
      _id: "60c09165cd159e10a8c81568",
      username: "harry",
      password: "$2b$10$6GTMUwEf/Koj8Gn/5TDN0eAqARk93odhmnKRIJE9Z/SwZ8GHx/8b2",
      email: "harry@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 0,
      about: "Im good",
      address: "501/A, High Level Road,Naduhena, Meegoda.",
      city: "Colombo",
      mobile: "0112458563",
      province: "10504harry",
      categories: [],
    },
    {
      notifications: [
        "60f7386f61ce0f108cdb72e2",
        "60fe544076e7b05d44b91f62",
        "60fe544176e7b05d44b91f63",
        "6100017d0f91e94650d6a1fe",
      ],
      _id: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      password: "$2b$10$uwNlYLzZ53RFQzaNWiBvieNM28iSflVKwxrF/O6x/zQ4AX/ULoPfu",
      email: "testrunmern@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 6,
      about: "Im good",
      address: "501/A, High Level Road,Naduhena, Meegoda.",
      city: "Colombo",
      mobile: "0112857539",
      province: "Colombo",
      categories: [
        {
          _id: "60ff1cdf9516ed38642a6150",
          name: "Celebration",
          score: 1,
        },
        {
          _id: "6100618808766b78487d29ce",
          name: "Music Concert",
          score: 11,
        },
      ],
    },
    {
      notifications: [],
      _id: "60c0134702597a3a9c5b1ea5",
      username: "John9865",
      password: "$2b$10$gkBU4UqEnE5FAk5002HUfeCLu4c69BSkFvMyKGxDskc8b5f0yUWqi",
      email: "ravindudeshan9865@gmail.com",
      firstname: "John",
      lastname: "Silva",
      __v: 0,
      about: "Hi I'm creative",
      address: "501/A ,High Level Road",
      city: "Colombo",
      mobile: "0112857539",
      province: "Colombo",
      categories: [],
    },
    {
      notifications: [],
      _id: "60c0815ecd159e10a8c8155f",
      username: "Yehan9865",
      password: "$2b$10$ndwf72DB7SBwEjEqjgxOIOrx3Aoae7xCk1Q6qPI.2QiYlqag9DUeu",
      email: "yehan@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      __v: 0,
      about: "Im good",
      address: "501/A, High Level Road,Naduhena, Meegoda.",
      city: "Colombo 2",
      mobile: "0112565895",
      province: "Yehan",
      categories: [],
    },
  ],
  TrendingTopicArray: [
    {
      _id: "60ff0f191b81bd494016803d",
      name: "Music Concert",
      hostingScore: 2,
      createdAt: "2021-07-26T19:38:01.189Z",
      updatedAt: "2021-07-27T20:06:59.872Z",
      __v: 0,
      bookingScore: 19,
    },
    {
      _id: "60ff0fd71b81bd4940168042",
      name: "Celebration",
      hostingScore: 1,
      createdAt: "2021-07-26T19:41:11.288Z",
      updatedAt: "2021-07-26T20:36:47.610Z",
      __v: 0,
      bookingScore: 1,
    },
    {
      _id: "60ff194ecddca830c085d20b",
      name: "Festival",
      hostingScore: 1,
      createdAt: "2021-07-26T20:21:34.237Z",
      updatedAt: "2021-07-26T20:21:34.237Z",
      __v: 0,
    },
    {
      _id: "610001d60f91e94650d6a200",
      name: "Gaming",
      hostingScore: 1,
      createdAt: "2021-07-27T12:53:42.429Z",
      updatedAt: "2021-07-27T12:53:42.429Z",
      __v: 0,
    },
    {
      _id: "61004051b4c99e21c49ef7f8",
      name: "Meeting",
      hostingScore: 1,
      createdAt: "2021-07-27T17:20:17.852Z",
      updatedAt: "2021-07-27T17:20:17.852Z",
      __v: 0,
    },
  ],
  TotalRevenue: 46.67,
  TotalBookings: 25,
  TotalTickets: null,
  labels: [
    "Vertigo",
    "book house 2021",
    "it18032598",
    "Ravindu",
    "vertigoo",
    "xcvb",
  ],
  dataArr: [22.575, 20, 4.095000000000001, 0, 0, 0],
};

let CharData = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
    },
  ],
};
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [eventDetails, setEventsSummary] = useState(sampleSummary);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const getDetails = () => {
    axios
      .get(`http://localhost:443/report/admin-events-summary/`)
      .then((res) => {
        setEventsSummary(res.data);

        console.log("Wanted Format ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
    // validatePush();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.TotalRevenue} $
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Events
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.AllEvents.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Bookings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.TotalBookings}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Generate Reports
                        </CardTitle>
                      </div>
                    </Row>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        window.open(
                          "http://localhost:3003/pdf-sales",
                          "_blank" // <- This is what makes it open in a new window.
                        );
                      }}
                    >
                      Event Sales Summary
                    </Button>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        window.open(
                          "http://localhost:3003/pdf",
                          "_blank" // <- This is what makes it open in a new window.
                        );
                      }}
                    >
                      Event Summary
                    </Button>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        window.open(
                          "http://localhost:3003/pdf-trends",
                          "_blank" // <- This is what makes it open in a new window.
                        );
                      }}
                    >
                      Trendings
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Revenue ($)
                    </h6>
                    <h2 className="mb-0">All Events</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={{
                      labels: eventDetails.labels,
                      datasets: [
                        {
                          label: "Revenue ($)",
                          data: eventDetails.dataArr,
                        },
                      ],
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow" style={{ marginTop: "50px" }}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Events</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Bookings</th>
                    <th scope="col">Total Revenue</th>
                  </tr>
                </thead>

                {eventDetails.AllEvents.map((aevent) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{aevent.name}</th>
                        <td>
                          {aevent.visits < 20 && (
                            <>
                              <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                              {aevent.visits}
                            </>
                          )}

                          {aevent.visits > 20 && (
                            <>
                              <i className="fas fa-arrow-up text-success mr-3" />{" "}
                              {aevent.visits}
                            </>
                          )}
                        </td>
                        <td>{aevent.totBookings}</td>
                        <td>{aevent.totRevenue}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
