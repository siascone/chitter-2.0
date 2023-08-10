# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 

    puts "Destroying tables..."

    User.destroy_all
    puts "Users destroyed!"

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    puts "Seeding Admin 1: Mozz..."
    User.create!(
        username: 'Mozz',
        email: 'mmoss@ri.io',
        first_name: 'Maurice',
        last_name: 'Moss',
        password: 'didYouSeeThatLudicrousDisplayLastNight'
    )
    puts "Seeding Admin 2: Roy..."
    User.create!(
        username: 'Roy',
        email: 'rtrenneman@ri.io',
        first_name: 'Roy',
        last_name: 'Trenneman',
        password: 'offAndOnAgain'
    )
    puts "Seeding Admin 3: Jen..."
    User.create!(
        username: 'Jen',
        email: 'jbarber@ri.io',
        first_name: 'Jennifer',
        last_name: 'Barber',
        password: 'password'
    )
    puts "Seeding Admin 4: Richmond..."
    User.create!(
        username: 'Richmond',
        email: 'ravenal@ri.io',
        first_name: 'Richmond',
        last_name: 'Avenal',
        password: 'gothToBoss'
    )

    10.times do 
        User.create!(
            username: Faker::Internet.unique.username(specifier: 3),
            email: Faker::Internet.unique.email,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            password: 'password'
        )
    end

    puts "DONE!"
end