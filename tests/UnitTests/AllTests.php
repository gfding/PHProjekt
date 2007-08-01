<?php
/**
 * AllTests merges all test from the modules and provides
 * several switches to control unit testing
 *
 * AllTests merges defined test suites for each
 * module, while each module itself has its own AllTests
 *
 * LICENSE: Licensed under the terms of the GNU Publice License
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
 *             GNU Public License 2.0
 * @version    CVS: $Id$
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 */

/* use command line switches to overwrite this */
define("DEFAULT_CONFIG_FILE", "configuration.ini");
define("DEFAULT_CONFIG_SECTION", "testing-mysql");

if (!defined('PHPUnit_MAIN_METHOD')) {
    define('PHPUnit_MAIN_METHOD', 'AllTests::main');
}

require_once 'PHPUnit/Framework.php';
require_once 'PHPUnit/TextUI/TestRunner.php';

require_once 'Default/AllTests.php';
require_once 'Phprojekt/AllTests.php';

require_once 'PHPUnit/Util/Filter.php';

/**
 * AllTests merges all test from the modules
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
 *             GNU Public License 2.0
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     David Soria Parra <soria_parra@mayflower.de>
 */
class AllTests extends PHPUnit_Framework_TestSuite
{
    /**
     * Initialize the TestRunner
     *
     */
    public static function main(Zend_Config $config)
    {
        PHPUnit_TextUI_TestRunner::run(self::suite($config));
    }

    /**
     * Merges the test suites
     *
     * @return PHPUnit_Framework_TestSuite
     */
    public static function suite(Zend_Config $config)
    {
        $db = Zend_Db::factory($config->database->type, array(
                                          'username' => $config->database->username,
                                          'password' => $config->database->password,
                                          'dbname'   => $config->database->name,
                                          'host'     => $config->database->host));

        Zend_Session::start();
        $suite = new PHPUnit_Framework_TestSuite('PHPUnit');
        $suite->sharedFixture = $db;
        $suite->addTest(Default_AllTests::suite());
        $suite->addTest(Phprojekt_AllTests::suite());

        // add here additional test suites

        return $suite;
    }
}

/*
 * This is actually our entry point. If we run from the commandline
 * we support several switches to the AllTest file.
 *
 * To see the switches try
 *   php AllTests.php -h
 */
if (PHPUnit_MAIN_METHOD == 'AllTests::main') {

    /* default settings */
    $whiteListing = true;
    $logging      = true;
    $configFile   = DEFAULT_CONFIG_FILE;
    $configSect   = DEFAULT_CONFIG_SECTION;

    if (function_exists('getopt') && isset($argv)) { /* Not available on windows */
        $options = getopt('s:c:hd');
        if (array_key_exists('h', $options)) {
            usage();
        }

        if (array_key_exists('c', $options)) {
            $configFile = $options['c'];
        }

        if (array_key_exists('s', $options)) {
            $configSect = $options['s'];
        }

        if (array_key_exists('d', $options)) {
            $whiteListing = false;
        }

        if (array_key_exists('l', $options)) {
            $logging = false;
        }

        if (!is_readable($configFile)) {
            fprintf(STDERR, "Cannot read %s\nAborted\n", $configFile);
            exit;
        }
    } elseif (isset($_GET)) {
        /* @todo make checks to avoid security leaks */
        if (array_key_exists('c', $_GET)) {
            $configFile = realpath($_GET['c']);
        }

        if (array_key_exists('s', $_GET)) {
            $configSect = $_GET['s'];
        }

        if (array_key_exists('d', $_GET)) {
            $whiteListing = ! $whiteListing;
        }
    }


    $config = new Zend_Config_Ini($configFile, $configSect);
    Zend_Registry::set('config', $config);
    if ($logging) {
        Zend_Loader::loadClass('Phprojekt_Log', PHPR_CORE_PATH);
        $oLog = new Phprojekt_Log($config);
        Zend_Registry::set('log', $oLog);
    }
    if ($whiteListing) {
        /* enable whitelisting for unit tests, these directories are
         * covered for the code coverage even they are not part of unit testing */
        PHPUnit_Util_Filter::addDirectoryToWhitelist($config->applicationDirectory . '/application');
    }

    AllTests::main($config);
}

function usage() {
    $doc = <<<EOF
PHProjekt UnitTesting suite. Uses PHPUnit by Sebastian Bergmann.

usage:
 php AllTests.php [OPTIONS]

 OPTIONS:
    -h           show help
    -c <file>    use <file> as configuration file, default 'configuration.ini'
    -s <section> <section> is used to read the ini, default 'testing-mysql'
    -d           disable whitelist filtering
    -l           disable logging

EOF;
    print $doc."\n";
    exit;
}
