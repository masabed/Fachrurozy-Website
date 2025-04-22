ph##Command for Docker

docker-compose down -v  # Stop and remove all containers & volumes

##Command for Laravel

php artisan config:clear
composer create-project laravel/laravel my-laravel-app

php artisan config:clear
php artisan cache:clear
php artisan serve

##restart laravel

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan serve


##link Tutorial

https://medium.com/@a3rxander/how-to-implement-jwt-authentication-in-laravel-11-26e6d7be5a41

#CreateController
php artisan make:controller Api/UserController


php artisan make:migration update_model_id_to_uuid --table=model_has_permissions

php artisan db:seed --class=RolePermissionSeeder    
