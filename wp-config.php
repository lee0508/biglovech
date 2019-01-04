<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', false);
define( 'WPCACHEHOME', '' );
define('DB_NAME', 'ymhpro01');

/** MySQL database username */
define('DB_USER', 'ymhpro01');

/** MySQL database password */
define('DB_PASSWORD', 'yy100514');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'b_mAOXDL^HYN?nk{}Pv_c0W3PHJ03nQ-Q5:Gc#Q|MMz839,LB%,Z^X>O@3&BH*mt');
define('SECURE_AUTH_KEY',  'y_Q2DAt<3avt8iJ!ALBXjniP{7R083ctTNC$D+$@)bX*M,=[GoR7^pUA.``,riJ ');
define('LOGGED_IN_KEY',    'Bj]ODGO{v1rIX3DgBahc/E0|^F:i$a4RoO}-pmwx9;3gMN+^cc68;%/2{rtf7<VV');
define('NONCE_KEY',        'EA)0<li:B3kw?-ogexlWJ<-5i!W3Y5?9.y6H?I@Fjq}3GU52p#)5@J/[jr|a-nU7');
define('AUTH_SALT',        'e(Yw~@>6oey<[=3z`O!K0$@%m&tuVrkoL6i)o<bltca23P}5$gpqO`y>5=|g{nc,');
define('SECURE_AUTH_SALT', ']4qmj)FI1ZeS=jOK~oYTmY[u:@b}A=vL.2b;uPq:<DhPqfBF~P^R}o^[knwrOzc`');
define('LOGGED_IN_SALT',   'Fkl_tZNz:~U{Gbtx>IZ8ii*N,6XWnF~P<|m$`D*6t8eQX3}Ap>bK:ZE}4z2?l_`x');
define('NONCE_SALT',       'X<09mil$e}^49J%D<`c|@@L-OgC7C^M?JDU:S&]^JcdOWJO^,jHNRvq8Lr9GbQ&5');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
