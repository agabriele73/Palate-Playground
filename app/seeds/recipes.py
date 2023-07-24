from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes():

    demo = Recipe(
        owner_id=1,
        title='test title',
        protein_type='chicken',
        steps='test steps',
        ingredients='test ingredients, ingredient, ingredient, ingredient, ingredient',
        prep_time='test prep time',
        cook_time='test cook time',
        steps_link='https://www.youtube.com/embed/dKPFcfXj8I4',
        image_url='https://i.imgur.com/tw3WrtL.png'
    )

    recipe1 = Recipe(
        owner_id=2,
        title='Spaghetti and Meatballs',
        protein_type='beef',
        steps='In a bowl, combine the chopped mortadella, ground beef, fennel seed, salt, garlic, parmesan cheese, black pepper, panko, and eggs, mixing well until the mixture becomes emulsified and tacky. Use a large cookie scoop to shape the mixture into around twenty meatballs, placing them on a sheet tray and rolling them into balls. Heat olive oil in a large sauté pan over medium-high heat, ensuring the bottom is covered. Once the oil is hot, add all the meatballs in a single layer and sear them for about 2 minutes on each side until they turn golden brown. It\'s alright if they are not fully cooked at this stage. Remove the meatballs from the pan and set them aside. For the sauce, reduce the heat to medium in the same pan used for the meatballs. Add the garlic and sauté for approximately five minutes, then incorporate the red pepper flakes and sauté for an additional thirty seconds. Stir in the crushed tomatoes, season with salt and a pinch of sugar, and mix well. Return the meatballs to the pan, bring the sauce to a simmer, and then reduce the heat to medium-low. Allow the meatballs to simmer in the sauce for about five to eight minutes, ensuring they are fully cooked. At the halfway point, add the slightly bruised basil and continue cooking. Before plating, reserve one cup of the sauce. Meanwhile, cook the spaghetti in a pot of boiling salted water according to the instructions on the package, until it is done. It is important not to drain the pasta. To serve, place the cooked spaghetti on plates, top it with the meatballs and sauce, and drizzle the reserved sauce on top. Enjoy!',
        ingredients='1 pound spaghetti, ¼ lb (123g) finely chopped mortadella, 1 lb (454g) ground beef, 1 tsp (2g) finely ground fennel seed (optional), 1 ¾ tsp (12g) fine sea salt, 3 cloves garlic (finely chopped), 1/4 cup (20g) fresh grated pecorino or parmesan, black pepper to taste, ½ cup (35g) panko bread crumbs crushed tell mostly fine, 1 whole egg, Sauce:, ¼ cup (50g) extra virgin olive oil, 4 cloves garlic (thinly sliced), 1 tsp (2g) red pepper flakes, 1 28 oz can crushed tomatoes, 1 bunch of basil, freshly grated Parmigiano for serving, chiffonade basil for serving',
        prep_time='15 minutes',
        cook_time='20 minutes',
        steps_link="https://www.youtube.com/embed/izAm3Ie9mNo",
        image_url='https://i.imgur.com/EDkTzM4.jpg'
    )

    recipe2 = Recipe(
        owner_id=3,
        title='Roasted Chicken and vegetables',
        protein_type='chicken',
        steps='Preheat the oven to 425 degrees F. Remove the chicken giblets and rinse the chicken inside and out. Pat the outside dry and remove any excess fat and pin feathers. Liberally season the inside of the chicken with salt and pepper. Stuff the cavity with thyme, lemon halves, and garlic. Brush the outside of the chicken with butter and sprinkle with salt and pepper. Tie the legs together with kitchen string and tuck the wing tips under the body. In a roasting pan, combine onions, carrots, and fennel. Toss with salt, pepper, thyme sprigs, and olive oil. Spread the vegetables in the bottom of the pan and place the chicken on top. Roast for 1 1/2 hours, or until the juices run clear when you cut between a leg and thigh. Transfer the chicken and vegetables to a platter, cover with foil, and let it rest for 20 minutes. Slice the chicken and serve with the roasted vegetables.',
        ingredients='1 (5 to 6 pound) roasting chicken, Kosher salt, Freshly ground black pepper, 1 large bunch fresh thyme, plus 20 sprigs, 1 lemon, halved, 1 head garlic, cut in half crosswise, 2 tablespoons (1/4 stick) butter, melted, 1 large yellow onion, thickly sliced, 4 carrots, cut into 2-inch chunks, 1 bulb of fennel, tops removed, and cut into wedges, Olive oil',
        prep_time='30 minutes',
        cook_time='1 hour',
        steps_link="https://www.youtube.com/embed/Ys7dyV97FXw",
        image_url='https://i.imgur.com/uKTWVr6.jpg'
    )

    recipe3 = Recipe(
        owner_id=1,
        title='Macaroni and cheese',
        protein_type='vegetarian',
        steps='In a large pot, bring milk to a boil. Reduce heat to medium-low, add macaroni, and cook, stirring frequently, for about 12 minutes or until the pasta is cooked. Remove from heat, add cheese, and stir until melted and incorporated. Serve and enjoy!',
        ingredients='4 cups (1 liter) Milk, 12oz (340g) Pasta (elbow macaroni), 7oz (200g) Cheddar cheese (shredded), 1 teaspoon Salt, 1/4 teaspoon Black pepper, 1/4 teaspoon Paprika',
        prep_time='20 minutes',
        cook_time='20 minutes',
        steps_link="https://www.youtube.com/embed/IzLn0pXntNE",
        image_url='https://i.imgur.com/Tpuy1Eq.jpg'
    )

    recipe4 = Recipe(
        owner_id=2,
        title='Easy Lemon Butter Fish',
        protein_type='seafood',
        steps= "Pat-dry fish fillets with paper towels. This is crucial for browning instead of steaming. Set aside. In a bowl, combine melted butter, lemon juice and zest, 1/2 tsp kosher salt. Stir well. Add more salt if desired. In a separate bowl, combine remaining 1/2 tsp kosher salt, paprika, garlic powder, onion powder, black pepper. Press spice mixture onto fish fillets. Heat olive oil in a large pan over medium-high heat. Cook 2 fillets at a time to avoid overcrowding. Cook until fish is opaque, firm in center, and browned, 2-3 minutes per side. Drizzle lemon butter sauce while cooking, save rest for serving. Don't overcook for a tender texture. Season with salt and pepper. Serve with remaining sauce, basil or parsley, lemon wedges.",
        ingredients= '4 firm white fish fillets; (about 6 inches long & 1-inch thickness throughout), 3 TB melted butter, Juice and zest from 1 medium lemon, ½ tsp kosher salt (plus extra to taste), 1 tsp paprika, 1 tsp garlic powder, 1 tsp onion powder, ¼ tsp freshly ground black pepper, 3 TbSp olive oil, freshly chopped basil or parsley leaves (for garnish and flavor), extra lemon slices (for serving)',
        prep_time='10 minutes',
        cook_time='15 minutes',
        steps_link="https://www.youtube.com/embed/fFgaUq_mdMI",
        image_url='https://i.imgur.com/HSKWnPX.jpg'
    )

    recipe5 = Recipe(
        owner_id=3,
        title='Egg Fried Rice',
        protein_type='vegetarian',
        steps='To make this delicious fried rice, start by beating the eggs in a bowl along with a pinch of salt and sliced green onions. Set this mixture aside. Slice the green onions diagonally for added visual appeal. Next, heat a wok or skillet over high heat and add 1 tablespoon of cooking oil, swirling it around to coat the surface. Pour the beaten eggs into the wok and scramble them. Once the eggs are about 3/4 cooked, add the remaining 2 tablespoons of cooking oil and the cold jasmine rice. Gently break down the rice and mix it with the eggs, allowing the flavors to combine. Day-old cold jasmine rice works best as it has a wonderful aroma and fluffy texture that holds up well during frying. Now, add soy sauce around the edge of the wok, creating a slightly burnt effect for a smoky and umami flavor. Adjust the salt according to your taste preferences and mix everything thoroughly. If needed, reduce the heat to low. Finally, turn off the heat and stir in the sliced green onions, enhancing the dish with their freshness and crunch. Enjoy!',
        ingredients='Cooking oil, Egg, Day old  rice (best consistency to make fried rice), Soy Sauce, Garlic, Green onions',
        prep_time='10 minutes',
        cook_time='10 minutes',
        steps_link="https://www.youtube.com/embed/qH__o17xHls",
        image_url='https://i.imgur.com/57whSIm.jpg'
    )





    db.session.add(demo)
    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)
    db.session.add(recipe4)
    db.session.add(recipe5)
    db.session.commit()


def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()