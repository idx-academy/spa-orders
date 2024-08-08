Feature: | Products |
    Verify that products page works correctly

    Background: Products page context
        Given The user is on the products page

    Scenario: Back to Home Page
        When The user clicks on Logo button
        Then The user should be redirected to Home Page and see the banner

    Scenario: User sees list of products after loading
        When The user looks at the products section
        And The user waits until products will be loaded
        Then The user should see 10 products

    Scenario: Request for products fails and user sees error message
        Given The user is on the products page and his connection is bad
        When The user waits until products will be loaded
        And The loading fails
        Then The user should see error message

    Scenario: User sees specific product description
        When The user looks at the product
        And Hovers product image
        Then The user should see product description

    Scenario: User navigates to the next page of products
        Given The user is on the first page of products
        When The user looks at the pagination
        And The user clicks next page button
        Then The 2 page of products should be displayed

    Scenario: User navigates to the previous page of products
        Given The user is on the second page of products
        When The user looks at the pagination
        And The user clicks previous page button
        Then The 1 page of products should be displayed

    Scenario: User navigates to the specific page of products
        Given The user is on the first page of products
        When The user looks at the pagination
        And The user clicks 2 page
        Then The 2 page of products should be displayed

    Scenario Outline: User can use products sorting with pagination
        When The user looks at the sorting dropdown
        And The user opens sorting dropdown
        And The user chooses sorting by "<criteria>"
        And The user clicks next page button
        Then Sorting by "<criteria>" should be applied
        And The 2 page of products should be displayed

        Examples:
            | criteria            |
            | Recommended         |
            | Newest              |
            | Price (low to high) |
            | Price (high to low) |
            | Name A-Z            |
            | Name Z-A            |
