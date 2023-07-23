<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Countable; // Import the Countable interface
use Illuminate\Http\Request;
use SplPriorityQueue; // Import the SplPriorityQueue class
class QueueWithPriority implements Countable {
    protected $queue = array();
/************************************************* */
    public function insert($item, $priority){
        $this->queue[$priority][] = $item;
    }
/**************************************************** */
    public function enqueue($item, $percentageOfModel) {
        // Calculate the priority based on the percentage of model
        $priority = 100 - $percentageOfModel;

        if (!isset($this->queue[$priority])) {
            $this->queue[$priority] = new SplPriorityQueue();
        }
        // Insert the item into the queue with the calculated priority
        $this->queue[$priority]->insert($item, $priority);
        // If the queue has more than 5 items, increase the priority of the item with the lowest percentage of model
        if ($this->count() > 5) {
            $lowestPriority = min(array_keys($this->queue));
            $lowestItem = $this->queue[$lowestPriority]->extract();
            $lowestItemPercentage = $lowestItem['percentage'];
            $newPriority = 100 - $lowestItemPercentage + 1;
            $this->enqueue($lowestItem, $lowestItemPercentage, $newPriority);
        }
    }
/************************************************** */
    public function dequeue(){
        $result = null;

        // Dequeue the item with the highest priority
        $highestPriority = max(array_keys($this->queue));
        if (isset($this->queue[$highestPriority]) && !$this->queue[$highestPriority]->isEmpty()) {
            $result = $this->queue[$highestPriority]->extract();
        }
        // Update the priorities of the remaining items in the queue
        foreach ($this->queue as $priority => $queue) {
            if ($priority != $highestPriority) {
                $newQueue = new SplPriorityQueue();
                while (!$queue->isEmpty()) {
                    $item = $queue->extract();
                    $newPriority = 100 - $item['percentage'];
                    $newQueue->insert($item, $newPriority);
                }
                $this->queue[$priority] = $newQueue;
            }
        }

        return $result;
    }
/****************************************** */
    public function getQueue(){
        $result = array();
        foreach($this->queue as $priority => $queue){
            foreach($queue as $item){
                $result[] = $item;
            }
        }
        return $result;
    }
/****************************************** */
    public function count(): int{
        $count = 0;
        foreach($this->queue as $items){
            $count += $items->count();
        }
        return $count;
    }
}
/****************************** */