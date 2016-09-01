<?php 
    class PDOHelper {
        //connect INFO
        private $WhichType;
        private $host;
        private $port;
        private $dbName;
        private $user;
        private $pwd;
        private $charset;
        
        //PDO and PDOStatement.
        private $pdo;
        private $stmt;
        
        // constructor
        public function __construct($arr = array()) {
            // set propotities.
            $this->WhichType = isset($arr['WhichType']) ? $arr['WhichType'] : 'mysql';
            $this->host = isset($arr['host']) ? $arr['host'] : 'localhost';
            $this->port = isset($arr['port']) ? $arr['port'] : '3306';
            $this->dbName = isset($arr['dbName']) ? $arr['dbName'] : 'E_commerce';
            $this->user = isset($arr['user']) ? $arr['user'] : 'root';
            $this->pwd = isset($arr['pwd']) ? $arr['pwd'] : 'root';
            $this->charset = isset($arr['charset']) ? $arr['charset'] : 'utf8';
            
            // using PDO to connect database.
            $this->connect();
            
            // set charset.
            $this->charset();
        }
        
        
        
        
        
        
        /*
         * Function : connect()
         * Description : this function is used to connect mysql database with PDO
         * Parameters : Nothing.
         * Return : Nothing,
         */
        private function connect(){
            $this->pdo = new 
            PDO("{$this->WhichType}:host={$this->host};port={$this->port};dbname={$this->dbName}",
            "{$this->user}","{$this->pwd}");
            
            // check connect whether successfully
            if (!$this->pdo) {
                // error
                exit("[SERVER ERROR] : PDO connect database failed.");
            }          
        }
        
        
        
        
        
        
        /*
         * Function : charset()
         * Description : this function is used to set charset for database.
         * Parameters : Nothing.
         * Return : Nothing.
         */
        private function charset(){
            // using pdo to set charset for database.
            $res = $this->pdo->exec("set names {$this->charset}");
            
            if($res === false){
                $error = $this->pdo->errorInfo();
                echo 'Set charset failed <br/>';
                echo 'ErrorCode: ' . $error[1] . '<br/>';
                echo 'ErrorInfo: ' . $error[2] . '<br/>';
                exit;
            }
        }
        
        
        
        
        
        /*
         * Function : Insert()
         * Description : This function is used to insert new user Info to database.
         * Parameters : $sql: query string.
         * Return : in: lastInsertId
         */
        public function Insert($sql){
            //
            if ($this->pdo->exec($sql)) {
				$res = intval($this->pdo->lastInsertId());
                return $res;
            }else {
                // error
                $error = $this->pdo->errorInfo();
                echo 'error code: ' . $error[1];
                echo 'error code: ' . $error[2];
                exit;
            }
        }
		
		
		
		
		/*
         * Function : delete()
         * Description : This function is used to delete user Info from database.
         * Parameters : $sql: query string.
         * Return : return effect row number
         */
		public function delete($sql)
		{
			if ($res = $this->pdo->exec($sql)) {
					// return effect row number.
					var_dump($res);
			}else {
				// error
				$error = $this->pdo->errorInfo();
				echo 'error code: ' . $error[1];
				echo 'error code: ' . $error[2];
				exit;
			}
		}
		
		
		
		
		/*
         * Function : modify($sql)
         * Description : This function is used to modify user Info from database.
         * Parameters : $sql: query string.
         * Return : return effect row number
         */
		public function modify($sql){
			    if ($res = intval($this->pdo->exec($sql))){					
					return $res;
				}else {
					// error
					$error = $this->pdo->errorInfo();
					echo 'error code: ' . $error[1];
					echo 'error code: ' . $error[2];
					exit;
				}
		}
		
        
        
        
        
        
        /*
         * Function : getRow()
         * Description : This function is used to get one row from database.
         * Parameters : $sql: query string.
         * Return : one row Infor.
         */
        public function getRow($sql)
        {
            $this->query($sql);
            
            // calling setMode() to set Mode.
            $this->setMode();
            
            return $this->stmt->fetch();
        }
        
        
        
        
        
        /*
         * Function : getAll()
         * Description : This funciton is uesd to all data from database.
         * Parameters : $sql: query string.
         * Return : all data. 
         */
        public function getAll($sql){
            $res = $this->query($sql);
			
			if($res === false){
				return false;
			}
			else{
				return $this->stmt->fetchAll();
			}
            //calling setMode() to set Mode.
            //$this->setMode();          
        }
		
        
        
        
        
        
        /*
         * Function : setMode()
         * Description : this function is used to set fetch mode.
         * Parameters : Nothing
         * Return : Nothing
         */
        private function setMode(){
            $this->stmt->setFetchMode(PDO::FETCH_ASSOC);
        }
        
        
        
        
        
        /*
         * Function : PDOSError() 
         * Description : this function is used to return error message when PDO statement has problem.
         * Parameters : Nothing.
         * Return : error Message.
         */
        private function PDOSError(){

        }
        
        
        
        
        
        /*
         * Function : query($sql)
         * Description : this function is used to encapsulate query method.
         * Parameters : $sql: query string.
         * Return : Nothing.
         */
		private function query($sql){
			if(false === $this->pdo->query($sql)){
				return false;
			}
			else{
				$this->stmt = $this->pdo->query($sql);
			}
		}
    }   
?>