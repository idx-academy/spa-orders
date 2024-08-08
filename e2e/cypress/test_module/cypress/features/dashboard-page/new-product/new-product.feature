Feature: | New Product |

  Background: Before each
    Given I authenticate to the system under role ROLE_MANAGER
    When I can see dashboard button on the header
    When I click on the dashboard button
    When I click on the "products" tab
    When I click on the 'New product' button

  Scenario: Manager successfully creates product with two languages
    When I fill in the 'Image URL' field with "http://image.com"
    And I fill in the 'Product Name' field with "name"
    And I fill in the 'Product Description' field with "product description"
    And I change language to "uk"
    And I fill in the 'Product Name' field with "name"
    And I fill in the 'Product Description' field with "product description"
    And I fill in the 'Price' field with "200"
    And I fill in the 'Quantity' field with "200"
    And I select 'Category' as "Mobiles"
    And I click on the 'Create product' button
    Then I should receive a snackbar with message 'Product successfully created'

  Scenario: Server error when manager creates a product
    Given Server returns 500 error when manager tries to create a product
    When I fill in the 'Image URL' field with "http://image.com"
    And I fill in the 'Product Name' field with "name"
    And I fill in the 'Product Description' field with "product description"
    And I fill in the 'Price' field with "200"
    And I fill in the 'Quantity' field with "200"
    And I select 'Category' as "Mobiles"
    And I click on the 'Create product' button
    Then I should receive a snackbar with message 'Failed to create product'

  Scenario Outline: Product Validation
    When I fill in the 'Image URL' field with "<imageUrl>"
    And I fill in the 'Product Name' field with "<productName>"
    And I fill in the 'Product Description' field with "<productDescription>"
    And I fill in the 'Price' field with "<price>"
    And I fill in the 'Quantity' field with "<quantity>"
    And I select 'Category' as "<category>"
    And I click on the 'Create product' button
    Then I should see "<message>"

    Examples:
      | imageUrl                     | productName  | productDescription | price | quantity | category  | message                                                              |
      | image.png                    | Test Product | Test Description   | 10    | 200      | Mobiles   | Please provide a valid URL                                           |
      | http://example.com/image.jpg | N            | Test Description   | 20    | 200      | Computers | Name is too short                                                    |
      | http://example.com/image.jpg | Test Product | Desc               | 20    | 200      | Computers | Description is too short                                             |
      | http://example.com/image.jpg |              | Test Description   | 20    | 200      | Computers | Either both name and description must be filled, either none of them |
      | http://example.com/image.jpg | Test Product |                    | 20    | 200      | Computers | Either both name and description must be filled, either none of them |
      | http://example.com/image.jpg |              |                    | 20    | 200      | Computers | At least one translation must have non-empty name and description    |
      | http://example.com/image.jpg | Test Product | Test Description   |       | 200      | Mobiles   | Invalid price                                                        |
      | http://example.com/image.jpg | Test Product | Test Description   | 20    |          | Computers | Invalid quantity                                                     |
      | http://example.com/image.jpg | Test Product | Test Description   | 20    | 200      |           | Please, select a category                                            |
