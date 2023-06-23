from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes():

    demo = Recipe(
        owner_id=1,
        title='test title',
        protein_type='test protein',
        steps='test steps',
        ingredients='test ingredients, ingredient, ingredient, ingredient, ingredient',
        prep_time='test prep time',
        cook_time='test cook time',
        steps_link='test steps link'
    )

    recipe1 = Recipe(
        owner_id=2,
        title='Spaghetti and Meatballs',
        protein_type='beef',
        steps='In a bowl, combine the chopped mortadella, ground beef, fennel seed, salt, garlic, parmesan cheese, black pepper, panko, and eggs, mixing well until the mixture becomes emulsified and tacky. Use a large cookie scoop to shape the mixture into around twenty meatballs, placing them on a sheet tray and rolling them into balls. Heat olive oil in a large sauté pan over medium-high heat, ensuring the bottom is covered. Once the oil is hot, add all the meatballs in a single layer and sear them for about 2 minutes on each side until they turn golden brown. It\'s alright if they are not fully cooked at this stage. Remove the meatballs from the pan and set them aside. For the sauce, reduce the heat to medium in the same pan used for the meatballs. Add the garlic and sauté for approximately five minutes, then incorporate the red pepper flakes and sauté for an additional thirty seconds. Stir in the crushed tomatoes, season with salt and a pinch of sugar, and mix well. Return the meatballs to the pan, bring the sauce to a simmer, and then reduce the heat to medium-low. Allow the meatballs to simmer in the sauce for about five to eight minutes, ensuring they are fully cooked. At the halfway point, add the slightly bruised basil and continue cooking. Before plating, reserve one cup of the sauce. Meanwhile, cook the spaghetti in a pot of boiling salted water according to the instructions on the package, until it is done. It is important not to drain the pasta. To serve, place the cooked spaghetti on plates, top it with the meatballs and sauce, and drizzle the reserved sauce on top. Enjoy!',
        ingredients='1 pound spaghetti, ¼ lb (123g) finely chopped mortadella, 1 lb (454g) ground beef, 1 tsp (2g) finely ground fennel seed (optional), 1 ¾ tsp (12g) fine sea salt, 3 cloves garlic (finely chopped), 1/4 cup (20g) fresh grated pecorino or parmesan, black pepper to taste, ½ cup (35g) panko bread crumbs crushed tell mostly fine, 1 whole egg, Sauce:, ¼ cup (50g) extra virgin olive oil, 4 cloves garlic (thinly sliced), 1 tsp (2g) red pepper flakes, 1 28 oz can crushed tomatoes, 1 bunch of basil, freshly grated Parmigiano for serving, chiffonade basil for serving',
        prep_time='15 minutes',
        cook_time='20 minutes',
        steps_link="https://www.youtube.com/embed/izAm3Ie9mNo"
    )

    recipe2 = Recipe(
        owner_id=3,
        title='Roasted Chicken and vegetables',
        protein_type='chicken',
        steps='Preheat the oven to 425 degrees F. Remove the chicken giblets and rinse the chicken inside and out. Pat the outside dry and remove any excess fat and pin feathers. Liberally season the inside of the chicken with salt and pepper. Stuff the cavity with thyme, lemon halves, and garlic. Brush the outside of the chicken with butter and sprinkle with salt and pepper. Tie the legs together with kitchen string and tuck the wing tips under the body. In a roasting pan, combine onions, carrots, and fennel. Toss with salt, pepper, thyme sprigs, and olive oil. Spread the vegetables in the bottom of the pan and place the chicken on top. Roast for 1 1/2 hours, or until the juices run clear when you cut between a leg and thigh. Transfer the chicken and vegetables to a platter, cover with foil, and let it rest for 20 minutes. Slice the chicken and serve with the roasted vegetables.',
        ingredients='1 (5 to 6 pound) roasting chicken, Kosher salt, Freshly ground black pepper, 1 large bunch fresh thyme, plus 20 sprigs, 1 lemon, halved, 1 head garlic, cut in half crosswise, 2 tablespoons (1/4 stick) butter, melted, 1 large yellow onion, thickly sliced, 4 carrots, cut into 2-inch chunks, 1 bulb of fennel, tops removed, and cut into wedges, Olive oil',
        prep_time='30 minutes',
        cook_time='1 hour',
        steps_link="https://www.youtube.com/embed/Ys7dyV97FXw"
    )

    recipe3 = Recipe(
        owner_id=1,
        title='Macaroni and cheese',
        protein_type='vegetarian',
        steps='In a large pot, bring milk to a boil. Reduce heat to medium-low, add macaroni, and cook, stirring frequently, for about 12 minutes or until the pasta is cooked. Remove from heat, add cheese, and stir until melted and incorporated. Serve and enjoy!',
        ingredients='4 cups (1 liter) Milk, 12oz (340g) Pasta (elbow macaroni), 7oz (200g) Cheddar cheese (shredded), 1 teaspoon Salt, 1/4 teaspoon Black pepper, 1/4 teaspoon Paprika',
        prep_time='20 minutes',
        cook_time='20 minutes',
        steps_link="https://www.youtube.com/embed/IzLn0pXntNE"
    )





    db.session.add(demo)
    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)
    db.session.commit()


def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()