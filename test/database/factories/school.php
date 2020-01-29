<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\School;
use Faker\Generator as Faker;

$factory->define(School, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
